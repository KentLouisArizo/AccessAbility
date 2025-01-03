import React, { useState } from 'react';
import styles from './styles/ResetPassword.module.css';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Import Firestore instance

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Email is required.');
      return;
    }

    try {
      // Add the email and message to the 'requestreset' collection in Firestore
      await addDoc(collection(db, 'requestreset'), {
        email: email,
        message: message || '', // Optional message
        timestamp: new Date(), // Add a timestamp for tracking
        isRead: false,
      });

      // Clear the form and show success message
      setSuccessMessage('Your request has been sent successfully.');
      setEmail('');
      setMessage('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorMessage('Failed to send your request. Please try again.');
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.box}>
        <h1>Reset Password</h1>
        <p>
          If you’ve forgotten your password, please contact the admin by filling out the form below. We will review
          your request and get back to you as soon as possible.
        </p>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message (optional):</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <button type="submit">Send Message</button>
          <Link to="/" className={styles.goBack}>Go Back</Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
