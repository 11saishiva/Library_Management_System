///home/sai_shiva/library-management-system old version before sricharan touched it/src/components/Auth/Register.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.username || !formData.password || !formData.name || !formData.email) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    const result = register(formData);
    
    if (!result.success) {
      setError(result.message);
      return;
    }
    
    // Redirect to home page after successful registration
    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Create Library Account</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Choose a password (min 6 characters)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Register
        </button>
      </form>
      
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;