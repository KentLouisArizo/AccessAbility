import React from 'react';
import styles from './styles/UserDashboard.module.css';

const UserDashboard = () => {
  const userName = "Zen, Akie C.";
  const disability = "Orthopedic Disability";
  const pwdId = "PWD-12345";

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <div className={styles.userName}>{userName}</div>
        <div className={styles.disability}>{disability}</div>
        <div className={styles.pwdId}>PWD ID: {pwdId}</div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.virtualId}>
          <h2>Offline Virtual ID</h2>
          <p>Your digital PWD ID</p>
        </div>

        <div className={styles.virtualBooklet}>
          <h2>Offline Virtual Booklet</h2>
          <p>Your digital PWD booklet</p>
        </div>

        <div className={styles.blank}>
          <h2>blank</h2>
          <p>No Details Yet</p>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
