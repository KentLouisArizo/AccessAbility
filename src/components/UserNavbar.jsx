import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/UserNavbar.module.css';
import PDAOlogo from '../imgs/PDAOlogo.jpg';

const UserNavbar = () => (
  <nav className={styles.navbar}>
    <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
    <div className={styles.navLinks}>
      <Link to="/user-dashboard">Home</Link>
      <Link to="/information-services">Information Services</Link>
      <Link to="/appointments">Appointment</Link>
      <Link to="/">Logout</Link>
    </div>
    <div className={styles.welcome}>
      Welcome, Zen
    </div>
  </nav>
);

export default UserNavbar;
