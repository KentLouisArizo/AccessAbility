import React from 'react';
import { BrowserRouter as HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import UserNavbar from './components/UserNavbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import RegistrationPWD from './components/RegistrationPWD';
import RegistrationRelative from './components/RegistrationRelative';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import IDCard from './components/IDCard';
import UserAnnouncement from './components/UserAnnouncement';
import Booklet from './components/Booklet';
import PasswordReset from './components/resetPassword';
import Footer from './components/Footer';
import EditProfile from './components/EditProfile';
import './App.css';

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <NavbarSwitcher />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register-pwd" element={<RegistrationPWD />} />
          <Route path="/register-relative" element={<RegistrationRelative />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/virtual-id" element={<IDCard />} />
          <Route path="/user-announcement" element={<UserAnnouncement />} />
          <Route path="/virtual-booklet" element={<Booklet />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
        <FooterSwitcher />
      </div>
    </HashRouter>
  );
};

const NavbarSwitcher = () => {
  const location = useLocation();
  const isUser = location.pathname.startsWith('/user-dashboard') || location.pathname.startsWith('/user-announcement') || location.pathname.startsWith('/virtual-id') || location.pathname.startsWith('/virtual-booklet') || location.pathname.startsWith('/edit-profile');

  return (
    <>
      {location.pathname.startsWith('/user-dashboard') ? (
        <UserNavbar userName="Daddy Pdf" />
      ) : isUser ? (
        <UserNavbar userName="User Name" />
      ) : null}
    </>
  );
};

const FooterSwitcher = () => {
  const location = useLocation();
  const isUser = location.pathname.startsWith('/user-dashboard') || location.pathname.startsWith('/user-announcement') || location.pathname.startsWith('/virtual-id') || location.pathname.startsWith('/virtual-booklet') || location.pathname.startsWith('/edit-profile');

  return (
    <>
      {location.pathname.startsWith('/user-dashboard') ? (
        <Footer userName="Daddy Pdf" />
      ) : isUser ? (
        <Footer userName="User Name" />
      ) : null}
    </>
  );
};

export default App;
