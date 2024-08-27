import React, { useState } from 'react';
import styles from './styles/Announcement.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import notif from '../imgs/notification.png';
import profile from '../imgs/profilelogo.png';
import { Link } from 'react-router-dom';

const Announcement = ({ userName }) => {
  const [notificationName, setNotificationName] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      notificationName,
      message,
      date,
      recipient,
    });
  };

  return (
    <div className={styles.announcementContainer}>
      <header className={styles.header}>
        <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
        <div className={styles.welcomeMessage}>Welcome, {userName}</div>
        <div className={styles.icons}>
          <img src={notif} alt="Notifications" className={styles.icon} />
          <img src={profile} alt="Profile" className={styles.icon} />
        </div>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="notificationName">Notification Name:</label>
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

        <div className={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="recipient">Recipient:</label>
          <select
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value="">Select recipient</option>
            <option value="all">All Users</option>
            <option value="admins">Admins</option>
            <option value="users">Users</option>
          </select>
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
}

export default Announcement;
