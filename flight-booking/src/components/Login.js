// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });
      localStorage.setItem('access_token', response.data.access_token);
      history.push('/index');
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
