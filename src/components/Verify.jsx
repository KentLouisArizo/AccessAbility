import React from 'react';
import styles from './styles/Verify.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import bellIcon from '../imgs/notification.png';
import userProfileIcon from '../imgs/profilelogo.png';

const Verify = () => {
  return (
    <div className={styles.verifyContainer}>
      <header className={styles.header}>
        <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
        <div className={styles.welcomeMessage}>
          <h1>Welcome! Admin</h1>
        </div>
        <div className={styles.icons}>
          <img src={bellIcon} alt="Notification Icon" className={styles.icon} />
          <img src={userProfileIcon} alt="User Profile Icon" className={styles.icon} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <h2 className={styles.title}>Verify User</h2>
        <div className={styles.searchSection}>
          <input type="text" placeholder="Enter User ID or Name" className={styles.searchInput} />
          <button className={styles.searchButton}>Search</button>
        </div>
        <div className={styles.userDetails}>
          <h3>User Details</h3>
          <p><strong>ID:</strong> 12345</p>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Barangay:</strong> Barangay 1</p>
          <p><strong>Status:</strong> Unverified</p>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.verifyButton}>Verify</button>
          <button className={styles.rejectButton}>Reject</button>
        </div>
      </main>
    </div>
  );
};

export default Verify;
