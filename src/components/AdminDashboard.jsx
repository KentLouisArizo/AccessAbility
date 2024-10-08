import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styles/AdminDashboard.module.css';
import search from '../imgs/filter.png';
import print from '../imgs/print.png';
import announcement from '../imgs/announce.png';
import report from '../imgs/report.png';
import logo from '../imgs/PDAOlogo.png';
import notif from '../imgs/notification.png';
import profile from '../imgs/profilelogo.png';

// Test imports for tab content
import PrintRecord from './PrintRecord';
import Announcement from './Announcement';
import GenerateReport from './GenerateReport';
import User from './User';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [verifiedUsersCount, setVerifiedUsersCount] = useState(0);
  const [unverifiedUsersCount, setUnverifiedUsersCount] = useState(0);

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

  // Fetch and count verified and unverified users
  useEffect(() => {
    const fetchUserCounts = async () => {
      const verifiedQuery = query(
        collection(db, 'registrations'),
        where('isVerified', '==', true)
      );
      const unverifiedQuery = query(
        collection(db, 'registrations'),
        where('isVerified', '==', false)
      );

      const unsubscribeVerified = onSnapshot(verifiedQuery, (snapshot) => {
        setVerifiedUsersCount(snapshot.size);
      });

      const unsubscribeUnverified = onSnapshot(unverifiedQuery, (snapshot) => {
        setUnverifiedUsersCount(snapshot.size);
      });

      return () => {
        unsubscribeVerified();
        unsubscribeUnverified();
      };
    };

    fetchUserCounts();
  }, []);

  const handleNotificationClick = () => {
    setShowNotificationBox(!showNotificationBox);
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
            className={`${styles.navItem} ${activeSection === 'user' ? styles.active : ''}`}
            onClick={() => setActiveSection('user')}
          >
            <img src={search} alt="User" className={styles.navIcon} />
            <span className={styles.navText}>User</span>
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
        </div>

        {showNotificationBox && (
          <div className={styles.notificationDropdown}>
            <div className={styles.notificationHeader}>
              <h4>Notifications</h4>
              <button onClick={handleCloseNotificationBox} className={styles.closeButton}>Close</button>
            </div>
            <div className={styles.notificationContent}>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className={styles.notificationItem}>
                    <p><strong>Name:</strong> {notification.firstName} {notification.lastName}</p>
                    <p><strong>Email:</strong> {notification.email}</p>
                  </div>
                ))
              ) : (
                <p>No new notifications</p>
              )}
            </div>
          </div>
        )}
      </aside>
      <main className={styles.mainContent}>
        {activeSection === 'dashboard' && (
          <div>
            <div className={styles.countsContainer}>
              <div className={styles.countBox}>
                <h3>Total Verified Users</h3>
                <p>{verifiedUsersCount}</p>
                <button className={styles.moreInfoButton}>More info</button>
              </div>
              <div className={styles.countBox}>
                <h3>Total Unverified Users</h3>
                <p>{unverifiedUsersCount}</p>
                <button className={styles.moreInfoButton}>More info</button>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'user' && <User />}
        {activeSection === 'print' && <PrintRecord />}
        {activeSection === 'announcement' && <Announcement />}
        {activeSection === 'report' && <GenerateReport />}
      </main>
    </div>
  );
};

export default AdminDashboard;
