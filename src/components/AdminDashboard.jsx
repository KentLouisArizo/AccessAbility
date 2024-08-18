import React from 'react';
import styles from './styles/AdminDashboard.module.css';
import search from '../imgs/filter.png';
import print from '../imgs/print.png';
import announcement from '../imgs/announce.png';
import report from '../imgs/report.png';
import verify from '../imgs/verify-user.png';
import reset from '../imgs/reset-pass.png';

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
      
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <img src={search} alt="Search Filter" />
          <button className={styles.gridButton}>Search Filter</button>
        </div>
        <div className={styles.gridItem}>
          <img src={print} alt="Print Record" />
          <button className={styles.gridButton}>Print Record</button>
        </div>
        <div className={styles.gridItem}>
          <img src={announcement} alt="Announcement" />
          <button className={styles.gridButton}>Announcement</button>
        </div>
        
        <div className={styles.gridItem}>
          <img src={report} alt="Generate Report" />
          <button className={styles.gridButton}>Generate Report</button>
        </div>
        <div className={styles.gridItem}>
          <img src={verify} alt="Verify User" />
          <button className={styles.gridButton}>Verify User</button>
        </div>
        <div className={styles.gridItem}>
          <img src={reset} alt="Reset User Password" />
          <button className={styles.gridButton}>Reset User Password</button>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <button className={styles.textButton}>View All Services</button>
        <div className={styles.countsContainer}>
          <div className={styles.countBox}>
            <h3>Total PWD</h3>
            <p>1234</p>
            <button className={styles.moreInfoButton}>More info</button>
          </div>
          <div className={styles.countBox}>
            <h3>Total User</h3>
            <p>567</p>
            <button className={styles.moreInfoButton}>More info</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
