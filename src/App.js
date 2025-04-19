
// App.js - React Router Integration
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ForgotPasswordPage from './pages/forgot-password';
import VerifyOTPPage from './pages/verify-otp';
import ResetPasswordPage from './pages/reset-password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;