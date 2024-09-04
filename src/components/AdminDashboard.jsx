import React, { useState } from 'react';
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

//test import for tab content
import Filter from './Filter';
import PrintRecord from './PrintRecord';
import Announcement from './Announcement';
import Verify from './Verify';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <img src={logo} alt="AccessAbility Logo" className={styles.sidebarLogo} />
        <div className={styles.sidebarIcons}>
          <img src={notif} alt="Notifications" className={styles.icon} />
          <img src={profile} alt="Profile" className={styles.icon} />
        </div>
        <div className={styles.navItems}>
          <div 
            className={`${styles.navItem} ${activeSection === 'dashboard' ? styles.active : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className={styles.navText}>Dashboard</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeSection === 'filter' ? styles.active : ''}`}
            onClick={() => setActiveSection('filter')}
          >
            <img src={search} alt="Search Filter" className={styles.navIcon} />
            <span className={styles.navText}>Search Filter</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeSection === 'print' ? styles.active : ''}`}
            onClick={() => setActiveSection('print')}
          >
            <img src={print} alt="Print Record" className={styles.navIcon} />
            <span className={styles.navText}>Print Record</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeSection === 'announcement' ? styles.active : ''}`}
            onClick={() => setActiveSection('announcement')}
          >
            <img src={announcement} alt="Announcement" className={styles.navIcon} />
            <span className={styles.navText}>Announcement</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeSection === 'report' ? styles.active : ''}`}
            onClick={() => setActiveSection('report')}
          >
            <img src={report} alt="Generate Report" className={styles.navIcon} />
            <span className={styles.navText}>Generate Report</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeSection === 'verify' ? styles.active : ''}`}
            onClick={() => setActiveSection('verify')}
          >
            <img src={verify} alt="Verify User" className={styles.navIcon} />
            <span className={styles.navText}>Verify User</span>
          </div>
          <div 
            className={`${styles.navItem} ${activeSection === 'reset' ? styles.active : ''}`}
            onClick={() => setActiveSection('reset')}
          >
            <img src={reset} alt="Reset User Password" className={styles.navIcon} />
            <span className={styles.navText}>Reset User Password</span>
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {activeSection === 'dashboard' && (
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
        )}
        {activeSection === 'filter' && <Filter />}
        {activeSection === 'print' && <PrintRecord />}
        {activeSection === 'announcement' && <Announcement />}
        {/*{activeSection === 'report' && <GenerateReport />}*/}
        {activeSection === 'verify' && <Verify />}
        {/*{activeSection === 'reset' && <ResetPassword />}*/}
      </main>
    </div>
  );
}

export default AdminDashboard;
