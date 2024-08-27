import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/HomepageNavbar.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';

const HomepageNavbar = () => (
  <nav className={styles.navbar}>
    <img src={PDAOlogo} alt="Logo" className={styles.logo} />
    <div className={styles.navLinks}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);

export default HomepageNavbar;
