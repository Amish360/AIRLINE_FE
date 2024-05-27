// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import RequestOTP from './components/RequestOTP';
import VerifyOTP from './components/VerifyOTP';
import PasswordReset from './components/PasswordReset';
import PasswordResetConfirm from './components/PasswordResetConfirm';
import FlightBooking from './components/FlightBooking';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/request-otp" component={RequestOTP} />
        <Route path="/verify-otp" component={VerifyOTP} />
        <Route path="/password-reset" component={PasswordReset} />
        <Route path="/password-reset-confirm/:token" component={PasswordResetConfirm} />
        <Route path="/flight" component={FlightBooking} /> {/* Your index page component */}
      </Switch>
    </Router>
  );
};

export default App;
