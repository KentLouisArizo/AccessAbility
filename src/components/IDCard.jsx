import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import styles from './styles/IDCard.module.css';
import logo from '../imgs/PDAOlogo.png';
import profileIcon from '../imgs/profilelogo.png';

const IDCard = () => {
  const [userData, setUserData] = useState({
    uniqueID: '',
    disabilityType: '',
    bloodType: '',
    mobileNo: '',
    dob: '',
    firstName: '',
    lastName: '',
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
              uniqueID: data.uniqueID,
              disabilityType: data.disabilityType,
              bloodType: data.bloodType,
              mobileNo: data.mobileNo,
              dob: data.dob,
              firstName: data.firstName,
              lastName: data.lastName,
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
    <div className={styles.cardContainer}>
      <img src={logo} alt="AccessAbility Logo" className={styles.logo} />
      <div className={styles.cardContent}>
        <img src={profileIcon} alt="Profile" className={styles.profileIcon} />
        <h1 className={styles.name}>
          {userData.firstName}, {userData.lastName}
        </h1>
        <p className={styles.title}>Name</p>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>ID No</span>
            <span className={styles.value}>{userData.uniqueID}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Type of Disability</span>
            <span className={styles.value}>{userData.disabilityType}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Blood Type</span>
            <span className={styles.value}>{userData.bloodType}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Phone</span>
            <span className={styles.value}>{userData.mobileNo}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Date of Birth</span>
            <span className={styles.value}>{userData.dob}</span>
          </div>
        </div>
        <p className={styles.validity}>Valid for 3 years</p>
      </div>
    </div>
  );
};

export default IDCard;
