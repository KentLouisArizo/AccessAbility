import React, { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
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

// Test imports for tab content
import Filter from './Filter';
import PrintRecord from './PrintRecord';
import Announcement from './Announcement';
import Verify from './Verify';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Firestore listener for new document in registrations
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'registrations'), (snapshot) => {
      const newNotifications = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          newNotifications.push({
            id: change.doc.id,
            ...change.doc.data(),
          });
        }
      });
      setNotifications((prev) => [...newNotifications, ...prev]);
    });

    return () => unsub();
  }, []);

  const handleNotificationClick = () => {
    if (notifications.length > 0) {
      setSelectedNotification(notifications[0]); // recent notification
      setShowNotificationBox(true);
    }
  };

  const handleCloseNotificationBox = () => {
    setShowNotificationBox(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <img src={logo} alt="AccessAbility Logo" className={styles.sidebarLogo} />
        <div className={styles.sidebarIcons}>
          <div className={styles.notificationIconWrapper} onClick={handleNotificationClick}>
            <img src={notif} alt="Notifications" className={styles.icon} />
            {notifications.length > 0 && (
              <span className={styles.notificationBadge}>{notifications.length}</span>
            )}
          </div>
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
          <div>
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
        )}
        {activeSection === 'filter' && <Filter />}
        {activeSection === 'print' && <PrintRecord />}
        {activeSection === 'announcement' && <Announcement />}
        {activeSection === 'verify' && <Verify />}
      </main>
      {showNotificationBox && (
        <div className={styles.notificationBox}>
          <div className={styles.notificationHeader}>
            <h4>New Registration</h4>
            <button onClick={handleCloseNotificationBox}>Close</button>
          </div>
          <div className={styles.notificationContent}>
            <p>A new user has registered!</p>
            <p><strong>Name:</strong> {selectedNotification?.firstName} {selectedNotification?.lastName}</p>
            <p><strong>Email:</strong> {selectedNotification?.email}</p>
            {/* for now just this */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;