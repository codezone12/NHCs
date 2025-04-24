import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ForgotPasswordPage from './pages/forgot-password';
import VerifyOTPPage from './pages/verify-otp';
import ResetPasswordPage from './pages/reset-password';
import HomePage from './pages/Home';
import NewsPage from './pages/News';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Dashboard from './pages/super-admin/dashboard';
import AdminLayout from './pages/super-admin/super-admin-layout';
import UsersPage from './pages/super-admin/users';
import SettingsPage from './pages/super-admin/settings';
import SchedulePage from './pages/super-admin/schedule';
import AnalyticsPage from './pages/super-admin/analytics';
import EditorLayout from './pages/editor/editor-layout';
import EditorDashboardPage from './pages/editor/dashboard';
import MyNewsPage from './pages/editor/my-news';
import EditorProfilePage from './pages/editor/profile';
import AddNewsPage from './pages/editor/add-news';
import EditorAnalyticsPage from './pages/editor/analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route element={<AdminLayout />}>
          <Route path="/super-admin/dashboard" element={<Dashboard />} />
          <Route path="/super-admin/users" element={<UsersPage />} />  
          <Route path="/super-admin/settings" element={<SettingsPage />} />  
          <Route path="/super-admin/schedule" element={<SchedulePage />} />  
          <Route path="/super-admin/analytics" element={<AnalyticsPage />} />  
        </Route>

        <Route element={<EditorLayout />}>
          <Route path="/editor/dashboard" element={<EditorDashboardPage />} />
          <Route path="/editor/my-news" element={<MyNewsPage />} />
          <Route path="/editor/add-news" element={<AddNewsPage />} />
          <Route path="/editor/analytics" element={<EditorAnalyticsPage />} />
          <Route path="/editor/profile" element={<EditorProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;