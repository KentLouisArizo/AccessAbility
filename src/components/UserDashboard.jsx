import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/UserDashboard.module.css';

const UserDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <div className={styles.userName}>Zen, Akie C.</div>
        <div className={styles.disability}>Orthopedic Disability</div>
        <div className={styles.pwdId}>PWD ID: PWD-12345</div>
      </div>

      <div className={styles.mainContent}>
        <Link to="/virtual-id" className={styles.link}>
          <div className={styles.virtualId}>
            <h2>Offline Virtual ID</h2>
            <p>Your digital PWD ID</p>
          </div>
        </Link>

        <Link to="/virtual-booklet" className={styles.link}>
          <div className={styles.virtualBooklet}>
            <h2>Offline Virtual Booklet</h2>
            <p>Your digital PWD booklet</p>
          </div>
        </Link>

        <div className={styles.blank}>
          <h2>Blank</h2>
          <p>No Details Yet</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;