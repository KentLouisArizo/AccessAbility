import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/AdminNavbar.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import notificationIcon from '../imgs/notification.png'; 
import profileIcon from '../imgs/profilelogo.png'; 

const AdminNavbar = () => (
  <nav className={styles.navbar}>
    <img src={PDAOlogo} alt="Logo" className={styles.logo} />
    <div className={styles.welcome}>Welcome, Admin</div>
    <div className={styles.navLinks}>
      <Link to="/settings">Settings</Link>
      <Link to="/">Logout</Link>
    </div>
    <div className={styles.icons}>
      <img src={notificationIcon} alt="Notifications" />
      <img src={profileIcon} alt="Profile" />
    </div>
  </nav>
);

export default AdminNavbar;
