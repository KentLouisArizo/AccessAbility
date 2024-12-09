import React from 'react';
import styles from './styles/ResetPassword.module.css';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.box}>
        <h1>Reset Password</h1>
        <p>
          If you’ve forgotten your password, please contact the admin by filling out the form below. We will review
          your request and get back to you as soon as possible.
        </p>
        <form className={styles.forms}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message (optional):</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here"
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
          <Link to="/" className={styles.goBack}>Go Back</Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
