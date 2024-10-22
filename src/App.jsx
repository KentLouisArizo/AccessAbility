import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomepageNavbar from './components/HomepageNavbar';
import AdminNavbar from './components/AdminNavbar';
import UserNavbar from './components/UserNavbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import RegistrationPWD from './components/RegistrationPWD';
import RegistrationRelative from './components/RegistrationRelative';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import IDCard from './components/IDCard';
import UserAnnouncement from './components/UserAnnouncement';
import Booklet from './components/Booklet';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavbarSwitcher />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register-pwd" element={<RegistrationPWD />} />
          <Route path="/register-relative" element={<RegistrationRelative />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/virtual-id" element={<IDCard />} />
          <Route path="/user-announcement" element={<UserAnnouncement />} />
          <Route path="/virtual-booklet" element={<Booklet />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const NavbarSwitcher = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin-dashboard') || location.pathname.startsWith('/announcement') || location.pathname.startsWith('/filter') || location.pathname.startsWith('/print') || location.pathname.startsWith('/verify');
  const isUser = location.pathname.startsWith('/user-dashboard') || location.pathname.startsWith('/user-announcement') || location.pathname.startsWith('/virtual-id') || location.pathname.startsWith('/virtual-booklet');

  return (
    <>
      {location.pathname === '/' || location.pathname.startsWith('/login') || location.pathname.startsWith('/register') ? (
        <HomepageNavbar />
      ) : isAdmin ? (
        <AdminNavbar userName="Daddy Pdf" />
      ) : isUser ? (
        <UserNavbar userName="User Name" />
      ) : null}
    </>
  );
};

export default App;
