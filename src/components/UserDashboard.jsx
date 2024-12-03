import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import styles from './styles/UserDashboard.module.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    disabilityType: '',
    uniqueID: '',
  });

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get currently logged-in user
        if (user) {
          const userDocRef = doc(db, 'registrations', user.uid); // Adjust collection and doc path
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              firstName: data.firstName,
              lastName: data.lastName,
              disabilityType: data.disabilityType,
              uniqueID: data.uniqueID,
            });
          } else {
            console.error('No user document found!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth, db]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <div className={styles.userName}>
          {userData.firstName}, {userData.lastName}
        </div>
        <div className={styles.disability}>Disability Type: {userData.disabilityType}</div>
        <div className={styles.pwdId}>ID: {userData.uniqueID}</div>
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

        {/*
        <div className={styles.blank}>
          <h2>Blank</h2>
          <p>No Details Yet</p>
        </div>
        */}
      </div>
    </div>
  );
};

export default UserDashboard;