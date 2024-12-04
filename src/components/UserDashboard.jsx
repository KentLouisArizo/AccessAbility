import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';  // Importing Firebase Storage
import styles from './styles/UserDashboard.module.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    disabilityType: '',
    uniqueID: '',
    profileImage: '', // Added profileImage to store image URL
  });

  const [loading, setLoading] = useState(true); // Loading state to handle async operations
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage(); // Firebase Storage reference

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get currently logged-in user
        if (user) {
          const userDocRef = doc(db, 'registrations', user.uid); // Adjust collection and doc path
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            // Fetch profile image from Firebase Storage
            const profileImageRef = ref(storage, `profileImages/${user.uid}`);
            const profileImageUrl = await getDownloadURL(profileImageRef);

            setUserData({
              firstName: data.firstName,
              lastName: data.lastName,
              disabilityType: data.disabilityType,
              uniqueID: data.uniqueID,
              profileImage: profileImageUrl, // Set the image URL
            });
          } else {
            console.error('No user document found!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchUserData();
  }, [auth, db, storage]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <div className={styles.profileImageContainer}>
          {/* Render profile image */}
          <img
            src={userData.profileImage || '/default-profile.png'} // Fallback to a default image
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
        <div className={styles.userName}>
          {userData.firstName}, {userData.lastName}
        </div>
        <div className={styles.disability}>Disability Type: {userData.disabilityType}</div>
        <div className={styles.pwdId}>ID: {userData.uniqueID}</div>
      </div>

      <div className={styles.mainContent}>
        <Link to="/virtual-id" className={styles.link}>
          <div className={styles.virtualId}>
            <h2>Virtual ID</h2>
            <p>Your digital PWD ID</p>
          </div>
        </Link>

        <Link to="/virtual-booklet" className={styles.link}>
          <div className={styles.virtualBooklet}>
            <h2>Virtual Booklet</h2>
            <p>Your digital PWD booklet</p>
          </div>
        </Link>

        <Link to="/edit-profile" className={styles.link}>
          <div className={styles.virtualBooklet}>
            <h2>Profile</h2>
            <p>Your Information</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
