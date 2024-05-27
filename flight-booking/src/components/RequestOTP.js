// src/components/RequestOTP.js
import React, { useState } from 'react';
import axios from 'axios';

const RequestOTP = () => {
  const [email, setEmail] = useState('');
  const [otpType, setOtpType] = useState('email');
  const [message, setMessage] = useState('');

  const handleRequestOTP = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/otp-request/', {
        email,
        otp_type: otpType,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Request OTP</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <select value={otpType} onChange={(e) => setOtpType(e.target.value)}>
        <option value="email">Email</option>
        <option value="sms">SMS</option>
      </select>
      <button onClick={handleRequestOTP}>Request OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestOTP;
// src/components/RequestOTP.js
import React, { useState } from 'react';
import axios from 'axios';

const RequestOTP = () => {
  const [email, setEmail] = useState('');
  const [otpType, setOtpType] = useState('email');
  const [message, setMessage] = useState('');

  const handleRequestOTP = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/otp-request/', {
        email,
        otp_type: otpType,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Request OTP</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <select value={otpType} onChange={(e) => setOtpType(e.target.value)}>
        <option value="email">Email</option>
        <option value="sms">SMS</option>
      </select>
      <button onClick={handleRequestOTP}>Request OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestOTP;
