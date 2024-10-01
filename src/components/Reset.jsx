import React, { useState } from 'react';
import styles from '../components/styles/Reset.module.css';

//simple reset password no database though
const Reset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
      alert('Password reset link sent to your email!');
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
        <button type="submit" className={styles.submitButton}>Send Reset Link</button>
      </form>
    </div>
  );
};

export default Reset;
