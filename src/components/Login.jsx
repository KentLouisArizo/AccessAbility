import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css';
import PDAOlogo from '../imgs/PDAOlogo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin123@gmail.com' && password === 'admin123') {
      navigate('/admin-dashboard');
    } else if (email === 'user@example.com' && password === 'user123') {
      navigate('/user-dashboard');
    } else {
      alert('Invalid email or password');
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
            />
          </div>
          <button type="submit">Login</button>
          <a href="#">Forgot Password?</a>
        </form>
      </div>
      <p className={styles.centerText}>
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
