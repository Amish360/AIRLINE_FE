// eslint-disable-next-line
import React, { useState } from 'react';
import axios from '../components/axiosconfig';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [isOTPRequested, setIsOTPRequested] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login/', { email, password });
      localStorage.setItem('token', response.data.access_token);
      setMessage('Login successful');
      // Redirect to dashboard or another page
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in');
    }
  };

  const handleSignup = async () => {
    try {
        // eslint-disable-next-line
      const response = await axios.post('/api/signup/', { email, password });
      setMessage('Signup successful');
      // Redirect to login page
    } catch (error) {
      console.error('Error signing up:', error);
      setMessage('Error signing up');
    }
  };

  const handleRequestOTP = async () => {
    try {
      await axios.post('/api/otp/request/', { email });
      setMessage('OTP requested successfully');
      setIsOTPRequested(true);
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setMessage('Error requesting OTP');
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.post('/api/password/change/', { email, new_password: password, otp });
      setMessage('Password changed successfully');
      // Redirect to login page
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('Error changing password');
    }
  };

  return (
    <div>
      <h1>Authentication</h1>
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
      {!isOTPRequested && (
        <button className="btn btn-primary" onClick={handleRequestOTP}>
          Request OTP
        </button>
      )}
      <div className="form-group">
        <label>OTP:</label>
        <input
          type="text"
          className="form-control"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          disabled={!isOTPRequested}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <button className="btn btn-primary" onClick={handleSignup}>
        Signup
      </button>
      <button className="btn btn-primary" onClick={handleChangePassword}>
        Change Password
      </button>
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default AuthPage;
