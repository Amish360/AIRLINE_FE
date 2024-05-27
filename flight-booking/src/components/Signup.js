// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [cnic, setCnic] = useState('');
  const [phno, setPhno] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        email,
        password,
        country,
        age,
        cnic,
        phno,
      });
      localStorage.setItem('access_token', response.data.access);
      history.push('/index');
    } catch (error) {
      setMessage(error.response.data.error || 'Error during signup');
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
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
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <input
        type="text"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        placeholder="CNIC"
      />
      <input
        type="text"
        value={phno}
        onChange={(e) => setPhno(e.target.value)}
        placeholder="Phone Number"
      />
      <button onClick={handleSignup}>Signup</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
