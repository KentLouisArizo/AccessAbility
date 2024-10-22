import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles/Login.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting login with:', { email, password });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'registrations', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check if the account is disabled
        if (userData.isDisabled) {
          alert('Your account is currently disabled. Please wait for admin approval.');
          return; // Prevent login if the account is disabled
        }

        // Check if the user is verified
        if (userData.isVerified) {
          if (email === 'admin123@gmail.com') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        } else {
          alert('Your account is awaiting verification by the admin.');
        }
      } else {
        alert('User data not found in Firestore.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.box}>
        <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required // Added required attribute
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required // Added required attribute
            />
          </div>
          <button type="submit">Login</button>
          <Link to="/forgot-password">Forgot Password?</Link>
        </form>
      </div>
      <p className={styles.centerText}>
        Don't have an account? <Link to="/">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
