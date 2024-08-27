import React from 'react';
import styles from './styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          &copy; 2024 AccessAbility. All rights reserved.
        </div>
        <nav className={styles.footerNav}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
