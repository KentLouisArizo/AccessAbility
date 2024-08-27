import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomepageNavbar from './components/HomepageNavbar';
import AdminNavbar from './components/AdminNavbar';
import UserNavbar from './components/UserNavbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Registration from './components/Registration';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import Announcement from './components/Announcement';
import Filter from './components/Filter';
import PrintRecord from './components/PrintRecord';
import Verify from './components/Verify';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavbarSwitcher />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/print" element={<PrintRecord />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const NavbarSwitcher = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin-dashboard') || location.pathname.startsWith('/announcement') || location.pathname.startsWith('/filter') || location.pathname.startsWith('/print') || location.pathname.startsWith('/verify');
  const isUser = location.pathname.startsWith('/user-dashboard');

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
