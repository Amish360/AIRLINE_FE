// LoginPage.js

import React, { useState } from 'react';
import axios from '../components/axiosconfig';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login/', { email, password });
      localStorage.setItem('token', response.data.access_token);
      setMessage('Login successful');
      window.location.href = '/flights';
      // Redirect to dashboard or another page
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <p>{message}</p>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
      <p>Forgot Password? <a href="/changepass">Change Password</a></p>
    </div>
  );
};

export default LoginPage;
