import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase Auth methods
import styles from '../components/styles/Reset.module.css';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State to show success message

  const auth = getAuth(); // Initialize Firebase Auth

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset link sent to your email!');
      setError('');
      setEmail(''); // Clear the email field after successful submission
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className={styles.resetContainer}>
      <form onSubmit={handleSubmit} className={styles.resetForm}>
        <h2>Reset Password</h2>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className={styles.inputField}
          placeholder="Enter your email"
        />
        {error && <p className={styles.errorMsg}>{error}</p>}
        {success && <p className={styles.successMsg}>{success}</p>} {/* Success message */}
        <button type="submit" className={styles.submitButton}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default Reset;
