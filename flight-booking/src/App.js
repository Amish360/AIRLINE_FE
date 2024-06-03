import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightBooking from './components/FlightBooking';
import SignupPage from './components/SignUp';
import LoginPage from './components/Login';
import ChangePasswordPage from './components/ChangePassword';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/flights" element={<FlightBooking />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/changepass" element={<ChangePasswordPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
