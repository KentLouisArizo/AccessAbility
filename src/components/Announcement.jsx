import React, { useState } from 'react';
import styles from './styles/Announcement.module.css';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Announcement = ({ userName }) => {
  const [notificationName, setNotificationName] = useState('');
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState(null); // State for start date
  const [endDate, setEndDate] = useState(null); // State for end date
  const [startTime, setStartTime] = useState(null); // State for start time
  const [endTime, setEndTime] = useState(null); // State for end time

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the announcement to Firestore
      await addDoc(collection(db, 'announcements'), {
        title: notificationName,
        message,
        startDate,
        endDate,
        startTime,
        endTime,
      });

      // Alert the user after successfully adding the announcement
      alert('Announcement added successfully!');

      // Optionally, reset the form fields after submission
      setNotificationName('');
      setMessage('');
      setStartDate(null);
      setEndDate(null);
      setStartTime(null);
      setEndTime(null);

    } catch (error) {
      console.error('Error adding announcement: ', error);
      alert('Failed to add the announcement. Please try again.');
    }
  };

  return (
    <div className={styles.announcementContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="notificationName">Title:</label>
          <input
            type="text"
            id="notificationName"
            value={notificationName}
            onChange={(e) => setNotificationName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Date Range Picker */}
        <div className={styles.formGroup}>
          <label htmlFor="dateRange">Date Range:</label>
          <div className={styles.dateRangeWrapper}>
            <input
              type="date"
              id="startDate"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className={styles.datePicker}
              placeholder="Start Date"
            />
            <span className={styles.dateSeparator}>to</span>
            <input
              type="date"
              id="endDate"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className={styles.datePicker}
              placeholder="End Date"
            />
          </div>
        </div>

        {/* Start Time Picker */}
        <div className={styles.formGroup}>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        {/* End Time Picker */}
        <div className={styles.formGroup}>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <Link to="/admin-dashboard">
            <button type="button" className={styles.closeButton}>Close</button>
          </Link>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Announcement;
