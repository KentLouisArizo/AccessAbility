import React from 'react';
import { Link } from 'react-router-dom';
import PDAOlogo from '../imgs/PDAOlogo.jpg';
import '../components/styles/Homepage.css';

const Homepage = () => {
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
                  <Link to="/register" className="button-primary">
                    Register
                  </Link>
                  <Link to="/login" className="button-secondary">
                    Login
                  </Link>
                </div>
              </div>
              <div className="content-image">
                <img
                  src={PDAOlogo}
                  alt="PWD & PDAO"
                  className="image"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default Homepage;