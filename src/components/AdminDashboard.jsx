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
      <aside className={styles.sidebar}>
        <img src={logo} alt="AccessAbility Logo" className={styles.sidebarLogo} />
        <div className={styles.sidebarIcons}>
          <img src={notif} alt="Notifications" className={styles.icon} />
          <img src={profile} alt="Profile" className={styles.icon} />
        </div>
        <div className={styles.navItems}>
          <Link to="/filter" className={styles.navItem}>
            <img src={search} alt="Search Filter" className={styles.navIcon} />
            <span className={styles.navText}>Search Filter</span>
          </Link>
          <Link to="/print" className={styles.navItem}>
            <img src={print} alt="Print Record" className={styles.navIcon} />
            <span className={styles.navText}>Print Record</span>
          </Link>
          <Link to="/announcement" className={styles.navItem}>
            <img src={announcement} alt="Announcement" className={styles.navIcon} />
            <span className={styles.navText}>Announcement</span>
          </Link>
          <button className={styles.navItem}>
            <img src={report} alt="Generate Report" className={styles.navIcon} />
            <span className={styles.navText}>Generate Report</span>
          </button>
          <Link to="/verify" className={styles.navItem}>
            <img src={verify} alt="Verify User" className={styles.navIcon} />
            <span className={styles.navText}>Verify User</span>
          </Link>
          <button className={styles.navItem}>
            <img src={reset} alt="Reset User Password" className={styles.navIcon} />
            <span className={styles.navText}>Reset User Password</span>
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.dashboardHeader}>
          <h2 className={styles.welcomeMessage}>Welcome! Admin</h2>
        </div>
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
      </main>
    </div>
  );
}

export default AdminDashboard;
