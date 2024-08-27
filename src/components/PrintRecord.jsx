import React from 'react';
import styles from './styles/PrintRecord.module.css';
import logo from '../imgs/PDAOlogo.png';
import notificationIcon from '../imgs/notification.png';
import profileIcon from '../imgs/profilelogo.png';

const PrintRecord = () => {
  return (
    <div className={styles.printRecordContainer}>
      <header className={styles.header}>
        <img src={logo} alt="AccessAbility Logo" className={styles.logo} />
        <h2 className={styles.welcomeMessage}>Welcome! Admin</h2>
        <div className={styles.icons}>
          <img src={notificationIcon} alt="Notifications" className={styles.icon} />
          <img src={profileIcon} alt="Profile" className={styles.icon} />
        </div>
      </header>

      <main className={styles.body}>
        <h3 className={styles.sectionTitle}>Print Record Section</h3>
        <div className={styles.recordOptions}>
          <div className={styles.option}>
            <button className={styles.printButton}>Print All Records</button>
          </div>
          <div className={styles.option}>
            <button className={styles.printButton}>Print Selected Records</button>
          </div>
        </div>
        <div className={styles.recordTable}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brgy</th>
                <th>Type</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>John Doe</td>
                <td>Brgy 1</td>
                <td>Type A</td>
                <td><input type="checkbox" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default PrintRecord;