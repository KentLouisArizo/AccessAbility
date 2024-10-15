import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Adjust path as needed
import styles from './styles/UserAnnouncement.module.css';

const UserAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'announcements'));
        const announcementData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnouncements(announcementData);
      } catch (error) {
        console.error('Error fetching announcements: ', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className={styles.announcementContainer}>
      <h2>Announcements</h2>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement.id} className={styles.announcement}>
            <h3>{announcement.title}</h3>
            <p>{announcement.message}</p>
            <p>
              <strong>Date:</strong> {new Date(announcement.startDate?.seconds * 1000).toLocaleDateString()} - {new Date(announcement.endDate?.seconds * 1000).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {new Date(announcement.startTime?.seconds * 1000).toLocaleTimeString()} - {new Date(announcement.endTime?.seconds * 1000).toLocaleTimeString()}
            </p>
          </div>
        ))
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default UserAnnouncement;
