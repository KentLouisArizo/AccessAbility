import React, { useState } from 'react';
import styles from './styles/Announcement.module.css';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the date picker styles

const Announcement = ({ userName }) => {
  const [notificationName, setNotificationName] = useState('');
  const [message, setMessage] = useState('');
  const [dateRange, setDateRange] = useState([null, null]); // State for the start and end date
  const [startDate, endDate] = dateRange;
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
      setDateRange([null, null]);
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
  <DatePicker
    selectsRange
    startDate={startDate}
    endDate={endDate}
    onChange={(update) => setDateRange(update)}
    isClearable={true}
    placeholderText="Select a date range"
    className={styles.datePicker}
  />
</div>


        {/* Start Time Picker */}
        <div className={styles.formGroup}>
          <label htmlFor="startTime">Start Time:</label>
          <DatePicker
            selected={startTime}
            onChange={(time) => setStartTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Start Time"
            dateFormat="h:mm aa"
            placeholderText="Select start time"
            className={styles.datePicker}
          />
        </div>

        {/* End Time Picker */}
        <div className={styles.formGroup}>
          <label htmlFor="endTime">End Time:</label>
          <DatePicker
            selected={endTime}
            onChange={(time) => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="End Time"
            dateFormat="h:mm aa"
            placeholderText="Select end time"
            className={styles.datePicker}
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