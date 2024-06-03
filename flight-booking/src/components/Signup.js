import React, { useState } from 'react';
import axios from '../components/axiosconfig';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnic, setCNIC] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('/api/register/', { email, password, cnic, age });
      setMessage('Signup successful');
      // Redirect to login page
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing up:', error);
      setMessage('Error signing up');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
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
      <div className="form-group">
        <label>CNIC:</label>
        <input
          type="text"
          className="form-control"
          value={cnic}
          onChange={(e) => setCNIC(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          className="form-control"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSignup}>
        Signup
      </button>
      <p>{message}</p>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
};

export default SignupPage;
