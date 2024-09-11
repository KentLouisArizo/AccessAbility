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
      <main className="homepage-main">
        <div className="content-container">
          <div className="content-grid">
            <div className="content-text">
              <h1 className="title">Welcome to PWD & PDAO</h1>
              <p className="description">
                This website is designed to serve the needs of Persons with Disabilities (PWDs) and Persons with
                Disability Affairs Offices (PDAOs) in our community. We strive to provide resources, information, and
                support to empower and assist those with disabilities.
              </p>
              <div className="button-group">
                <div className="dropdown">
                  <button
                    className="button-primary"
                    onClick={toggleDropdown}
                  >
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
                <Link to="/login" className="button-secondary">
                  Login
                </Link>
              </div>
            </div>
            <div className="content-image">
              <img src={PDAOlogo} alt="PWD & PDAO" className="image" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
