import React from 'react';
import { Link } from 'react-router-dom';
import './styles/UserDashboard.module.css'; 

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
};

export default UserDashboard;
