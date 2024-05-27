// src/components/PasswordResetConfirm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const PasswordResetConfirm = () => {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handlePasswordResetConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/password-reset-confirm/', {
        token,
        email,
        new_password: newPassword,
      });
      setMessage(response.data.message);
      history.push('/login');
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Confirm Password Reset</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <button onClick={handlePasswordResetConfirm}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
