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
import BlogListAdminPage from './pages/super-admin/blog-list';
import AddBlogAdminPage from './pages/super-admin/add-blog';
import EditBlogAdminPage from './pages/super-admin/edit-blog';
import AddNewsAdminPage from './pages/super-admin/add-news';
import NewsListAdminPage from './pages/super-admin/news-list';
import EditNewsAdminPage from './pages/super-admin/edit-news';
import SettingsPage from './pages/super-admin/settings';
import SchedulePage from './pages/super-admin/schedule';
import AnalyticsPage from './pages/super-admin/analytics';
import EditorLayout from './pages/editor/editor-layout';
import EditorDashboardPage from './pages/editor/dashboard';
import MyNewsPage from './pages/editor/my-news';
import EditorProfilePage from './pages/editor/profile';
import AddNewsPage from './pages/editor/add-news';
import NewsListPage from './pages/editor/news-list';
import EditNewsPage from './pages/editor/edit-news';
import EditorAnalyticsPage from './pages/editor/analytics';
import BlogListPage from './pages/editor/blog-list';
import AddBlogPage from './pages/editor/add-blog';
import EditBlogPage from './pages/editor/edit-blog';
import { ToastContainer } from 'react-toastify';
import NewsDetailPage from './pages/NewsDetailsPage';
import SubPage from './pages/SubPage';
import PublicDiplomacyPage from './pages/BlogPost';
import BlogDetails from './pages/BlogDetails';
import NhccPage from './pages/Nhcc';
import EventsPage from './pages/super-admin/events';
import FestivalHighlightsPage from './pages/super-admin/festival-highlights';
import FestivalEventsPage from './pages/super-admin/festival-events';
import Transportations from './pages/super-admin/transportations';
import AdminProfilePage from './pages/super-admin/profile';
import ProtectedRoute from './middleware/ProtectedRoute';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news-details" element={<NewsDetailPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/festival" element={<SubPage />} />
        <Route path="/publicdiplomacy" element={<PublicDiplomacyPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/nhcc" element={<NhccPage />} />
      
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Admin Routes - Protected for ADMIN role only */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/super-admin/dashboard" element={<Dashboard />} />
            <Route path="/super-admin/users" element={<UsersPage />} />  
            <Route path="/super-admin/events" element={<EventsPage />} />  
            <Route path="/super-admin/festival-events" element={<FestivalEventsPage />} />  
            <Route path="/super-admin/festival-highlights" element={<FestivalHighlightsPage />} />  
            <Route path="/super-admin/transportations" element={<Transportations />} />  
            <Route path="/super-admin/news-list" element={<NewsListAdminPage />} />
            <Route path="/super-admin/add-news" element={<AddNewsAdminPage />} />
            <Route path="/super-admin/edit-news/:id" element={<EditNewsAdminPage />} />
            <Route path="/super-admin/blog-list" element={<BlogListAdminPage />} />
            <Route path="/super-admin/add-blog" element={<AddBlogAdminPage />} />
            <Route path="/super-admin/edit-blog/:id" element={<EditBlogAdminPage />} />
            <Route path="/super-admin/settings" element={<SettingsPage />} />  
            <Route path="/super-admin/schedule" element={<SchedulePage />} />  
            <Route path="/super-admin/analytics" element={<AnalyticsPage />} />  
            <Route path="/super-admin/profile" element={<AdminProfilePage />} />
          </Route>
        </Route>

        {/* Editor Routes - Protected for both ADMIN and EDITOR roles */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'EDITOR']} />}>
          <Route element={<EditorLayout />}>
            <Route path="/editor/dashboard" element={<EditorDashboardPage />} />
            <Route path="/editor/my-news" element={<MyNewsPage />} />
            <Route path="/editor/news-list" element={<NewsListPage />} />
            <Route path="/editor/add-news" element={<AddNewsPage />} />
            <Route path="/editor/edit-news/:id" element={<EditNewsPage />} />
            <Route path="/editor/blog-list" element={<BlogListPage />} />
            <Route path="/editor/add-blog" element={<AddBlogPage />} />
            <Route path="/editor/edit-blog/:id" element={<EditBlogPage />} />
            <Route path="/editor/analytics" element={<EditorAnalyticsPage />} />
            <Route path="/editor/profile" element={<EditorProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;