import React, { useState } from 'react';
import styles from './styles/Filter.module.css';
import searchIcon from '../imgs/search-icon.png';
import filterIcon from '../imgs/filter-iconSB.png';
import logo from '../imgs/PDAOlogo.png';
import notif from '../imgs/notification.png';
import profile from '../imgs/profilelogo.png';

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.header}>
        <img src={logo} alt="AccessAbility Logo" className={styles.logo} />
        <div className={styles.welcomeMessage}>Welcome! Admin</div>
        <div className={styles.icons}>
          <img src={notif} alt="Notifications" className={styles.icon} />
          <img src={profile} alt="Profile" className={styles.icon} />
        </div>
      </div>

      <div className={styles.searchBar}>
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchField}
          placeholder="Search..."
        />
        <div className={styles.filterWrapper}>
          <img
            src={filterIcon}
            alt="Filter"
            className={styles.filterIcon}
            onClick={toggleFilter}
          />
          {isFilterOpen && (
            <div className={styles.filterDropdown}>
              <label>
                <input type="checkbox" name="id" /> ID
              </label>
              <label>
                <input type="checkbox" name="name" /> Name
              </label>
              <label>
                <input type="checkbox" name="brgy" /> Brgy (Barangay)
              </label>
              <label>
                <input type="checkbox" name="type" /> Type
              </label>
            </div>
          )}
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brgy (Barangay)</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Sample Barangay</td>
            <td>Sample Type</td>
            <td><button className={styles.viewButton}>View</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Filter;
