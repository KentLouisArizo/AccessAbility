import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/AdminDashboard.module.css';
import search from '../imgs/filter.png';
import print from '../imgs/print.png';
import announcement from '../imgs/announce.png';
import report from '../imgs/report.png';
import verify from '../imgs/verify-user.png';
import reset from '../imgs/reset-pass.png';
import logo from '../imgs/PDAOlogo.png';
import notif from '../imgs/notification.png';
import profile from '../imgs/profilelogo.png';

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>

      <header className={styles.header}>
        <img src={logo} alt="AccessAbility Logo" className={styles.logo} />
        <h2 className={styles.welcomeMessage}>Welcome! Admin</h2>
        <div className={styles.icons}>
          <img src={notif} alt="Notifications" className={styles.icon} />
          <img src={profile} alt="Profile" className={styles.icon} />
        </div>
      </header>
      
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <img src={search} alt="Search Filter" />
          <Link to="/filter">
            <button className={styles.gridButton}>Search Filter</button>
          </Link>
        </div>

        <div className={styles.gridItem}>
          <img src={print} alt="Print Record" />
          <Link to="/print">
            <button className={styles.gridButton}>Print Record</button>
          </Link>
        </div>

        <div className={styles.gridItem}>
          <img src={announcement} alt="Announcement" />
          <Link to="/announcement">
            <button className={styles.gridButton}>Announcement</button>
          </Link>
        </div>
        
        <div className={styles.gridItem}>
          <img src={report} alt="Generate Report" />
          <button className={styles.gridButton}>Generate Report</button>
        </div>

        <div className={styles.gridItem}>
          <img src={verify} alt="Verify User" />
          <Link src="/verify">
            <button className={styles.gridButton}>Verify User</button>
          </Link>
        </div>
        
        <div className={styles.gridItem}>
          <img src={reset} alt="Reset User Password" />
          <button className={styles.gridButton}>Reset User Password</button>
        </div>
      </div>

      <div className={styles.bottomSection}>
        {/*<button className={styles.textButton}>View All Services</button>*/}
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
