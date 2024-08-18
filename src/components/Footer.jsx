import React from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">&copy; 2024 AccessAbility</p>
        <nav className="footer-nav">
          <Link to="#" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="#" className="footer-link">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
