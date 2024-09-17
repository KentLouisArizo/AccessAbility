import React from 'react';
import styles from './styles/IDCard.module.css';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../imgs/PDAOlogo.png';
import profileIcon from '../imgs/profilelogo.png'; 


const IDCard = () => {
  return (
    <div className={styles.cardContainer}>
      <img src={logo} alt="AccessAbility Logo" className={styles.logo} />
      <div className={styles.cardContent}>
        <img src={profileIcon} alt="Profile" className={styles.profileIcon} />
        <h1 className={styles.name}>Izuku, Midoriya</h1>
        <p className={styles.title}>Name</p>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>ID No</span>
            <span className={styles.value}>1919619694961</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Type of Disability</span>
            <span className={styles.value}>Mamamam</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Blood Type</span>
            <span className={styles.value}>B</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Phone</span>
            <span className={styles.value}>9999999999</span>
          </div>
        </div>
        <p className={styles.validity}>Valid for 3 years</p>
        <button className={styles.nextButton}>
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default IDCard;
