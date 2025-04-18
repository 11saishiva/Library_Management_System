//   src/components/Auth/Login.js




import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { supabase } from '../../data/db';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!username || !password) {
        setError('Please enter both username and password');
        return;
      }
      
      const result = await login(username, password);
      
      if (!result.success) {
        setError(result.message);
        return;
      }
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2> Login to continue </h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Login
        </button>
      </form>
      
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

// Move the login logic to AuthContext.js
// If you need to keep this functionality here as well, you can do:
/*
export const loginUser = async (username, password) => {
  try {
    // First check if user exists without checking password
    const { data: userExists, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('username', username);
      
    if (userError) {
      console.error('User check error:', userError);
      return { success: false, message: 'Database error occurred' };
    }
    
    if (!userExists || userExists.length === 0) {
      return { success: false, message: 'User not found' };
    }
    
    // Now check credentials
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password);
    
    if (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Authentication error' };
    }
    
    if (data && data.length > 0) {
      const userToStore = {...data[0]};
      delete userToStore.password;
      
      return { success: true, user: userToStore };
    } else {
      return { success: false, message: 'Invalid password' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};
*/

export default Login;