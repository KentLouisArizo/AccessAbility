import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/UserNavbar.module.css';
import PDAOlogo from '../imgs/PDAOlogo.jpg';

const UserNavbar = ({ userName }) => (
  <nav className={styles.navbar}>
    <img src={PDAOlogo} alt="Logo" className={styles.logo} />
    <div className={styles.welcome}>Welcome, {userName}</div>
    <div className={styles.navLinks}>
      <Link to="/user-dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/logout">Logout</Link>
    </div>
    <div className={styles.icons}>
      <img src="/path/to/notification-icon.png" alt="Notifications" />
      <img src="/path/to/user-profile-icon.png" alt="Profile" />
    </div>
  </nav>
);

export default UserNavbar;
