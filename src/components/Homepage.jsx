import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PDAOlogo from '../imgs/PDAOlogo.png';
import '../components/styles/Homepage.css';

const Homepage = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="homepage-container">
      {/* Left Section */}
      <div className="logo-section">
        <div className="logo-container">
          <img src={PDAOlogo} alt="Large Logo" className="large-logo" />
          <img src={PDAOlogo} alt="Main Logo" className="logo-image" />
        </div>
      </div>

      {/* Right Section */}
      <div className="info-section">
        <div className="info-content">
          <h1 className="title">AccessAbility</h1>
          <p className="description">
          This website is designed to serve the needs of Persons with 
          Disabilities (PWDs) and Persons with Disability Affairs Offices 
          (PDAOs) in our community. We strive to provide resources, 
          information, and support to empower and assist those with 
          disabilities.
          </p>

          {/* Buttons */}
          <div className="button-group">
            <Link to="/login" className="button-secondary">
              Login
            </Link>
            <div className="dropdown">
              <button className="button-primary" onClick={toggleDropdown}>
                Register
              </button>
              {dropdownVisible && (
                <div className="dropdown-content">
                  <Link to="/register-PWD" className="dropdown-item">
                    Register PWD
                  </Link>
                  <Link to="/register-Relative" className="dropdown-item">
                    Register Relative
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Forgot Password */}
          <Link to="/reset-password" className="forgot-password">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
