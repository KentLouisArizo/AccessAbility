import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/UserNavbar.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
      <button className={styles.burgerIcon} onClick={toggleMenu}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </button>
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
        <Link to="/user-dashboard" onClick={toggleMenu}>Home</Link>
        <Link to="/information-services" onClick={toggleMenu}>Information Services</Link>
        <Link to="/appointments" onClick={toggleMenu}>Appointment</Link>
        <Link to="/" onClick={toggleMenu}>Logout</Link>
      </div>
    </nav>
  );
};

export default UserNavbar;