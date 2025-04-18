// src/components/Auth/AuthContext.js


import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../../data/db';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('libraryUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // const login = async (username, password) => {
  //   try {
  //     // In a production app, use Supabase Auth instead
  //     const { data, error } = await supabase
  //       .from('users')
  //       .select('*')
  //       .eq('username', username)
  //       .eq('password', password)
  //       .single();
      
  //     if (error) {
  //       throw error;
  //     }
      
  //     if (data) {
  //       const userToStore = {...data};
  //       delete userToStore.password; // Don't store password in state/localStorage
        
  //       setUser(userToStore);
  //       localStorage.setItem('libraryUser', JSON.stringify(userToStore));
  //       return { success: true };
  //     } else {
  //       return { 
  //         success: false, 
  //         message: "Invalid username or password" 
  //       };
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     return { 
  //       success: false, 
  //       message: "An error occurred during login" 
  //     };
  //   }
  // };
  // In your AuthContext.js file or your login function
const login = async (username, password) => {
  try {
    // First check if user exists
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);
      
    if (userError) {
      console.error('User check error:', userError);
      return { success: false, message: 'Database error occurred' };
    }
    
    // Handle case where user is not found
    if (!users || users.length === 0) {
      return { success: false, message: 'User not found' };
    }
    
    // Handle case where multiple users with same username exist (shouldn't happen if username is unique)
    if (users.length > 1) {
      console.error('Multiple users found with the same username');
      return { success: false, message: 'Authentication error' };
    }
    
    // Check password for the single user found
    const user = users[0];
    if (user.password === password) {
      const userToStore = {...user};
      delete userToStore.password; // Don't store password in client
      
      setUser(userToStore);
      localStorage.setItem('libraryUser', JSON.stringify(userToStore));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid password' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};
  const register = async (userData) => {
    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', userData.username)
        .single();
      
      if (existingUser) {
        return { 
          success: false, 
          message: "Username already exists" 
        };
      }
      
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            username: userData.username,
            password: userData.password, // In a real app, this would be hashed or use Supabase Auth
            name: userData.name,
            email: userData.email
          }
        ])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Auto login the new user
      const userToStore = {...data};
      delete userToStore.password;
      
      setUser(userToStore);
      localStorage.setItem('libraryUser', JSON.stringify(userToStore));
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: "An error occurred during registration" 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('libraryUser');
  };

  const updateUser = async (updatedUserData) => {
    try {
      // Update the user in the database
      const { error } = await supabase
        .from('users')
        .update(updatedUserData)
        .eq('id', updatedUserData.id);
      
      if (error) {
        throw error;
      }
      
      // If the current user is the one being updated, update the current user state
      if (user && user.id === updatedUserData.id) {
        setUser({...user, ...updatedUserData});
        localStorage.setItem('libraryUser', JSON.stringify({...user, ...updatedUserData}));
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;