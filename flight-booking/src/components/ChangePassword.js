import React, { useState } from 'react';
import axios from '../components/axiosconfig';

const ChangePasswordPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateOTP = async () => {
    try {
      await axios.post('/api/otp/request/', { email });
      setOtpSent(true);
      setMessage('OTP sent successfully');
    } catch (error) {
      console.error('Error generating OTP:', error);
      setMessage('Error generating OTP');
    }
  };

  const handleChangePassword = async () => {
    try {
      // Verify OTP first
      await axios.post('/api/otp/verify/', { email, otp });
      // If OTP verification is successful, change the password
      await axios.post('/api/password/reset/', { email, new_password: password, otp });
      setMessage('Password changed successfully');
      // Redirect to login page
      // Replace '/login' with the actual login page URL
      window.location.href = '/';
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('Error changing password');
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
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
        <label>New Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>OTP:</label>
        <input
          type="text"
          className="form-control"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        
          <button className="btn btn-primary" onClick={handleGenerateOTP}>
            Generate OTP
          </button>
       
      </div>
      {otpSent && (
        <button className="btn btn-primary" onClick={handleChangePassword}>
          Change Password
        </button>
      )}
      <p>{message}</p>
    </div>
  );
};

export default ChangePasswordPage;
