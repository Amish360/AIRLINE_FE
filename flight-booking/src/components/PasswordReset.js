// src/components/PasswordReset.js
import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/password-reset/', {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Password Reset</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;
