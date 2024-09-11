import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styles/Verify.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import bellIcon from '../imgs/notification.png';
import userProfileIcon from '../imgs/profilelogo.png';

const Verify = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations')); // Adjust collection name if needed
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter(user => 
      user.uniqueId.includes(searchTerm) || user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleVerify = async () => {
    // Add logic to verify the user
    alert(`User ${selectedUser.uniqueId} verified`);
  };

  const handleReject = async () => {
    // Add logic to reject the user
    alert(`User ${selectedUser.uniqueId} rejected`);
  };

  return (
    <div className={styles.verifyContainer}>
      <header className={styles.header}>
        <img src={PDAOlogo} alt="AccessAbility Logo" className={styles.logo} />
        <div className={styles.welcomeMessage}>
          <h1>Welcome! Admin</h1>
        </div>
        <div className={styles.icons}>
          <img src={bellIcon} alt="Notification Icon" className={styles.icon} />
          <img src={userProfileIcon} alt="User Profile Icon" className={styles.icon} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <h2 className={styles.title}>Verify User</h2>
        <div className={styles.searchSection}>
          <input 
            type="text" 
            placeholder="Enter User ID or Name" 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
        <div className={styles.userList}>
          {users.map(user => (
            <div key={user.uniqueId} className={styles.userItem} onClick={() => handleUserClick(user)}>
              <p><strong>ID:</strong> {user.uniqueId}</p>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Barangay:</strong> {user.barangay}</p>
              <p><strong>Status:</strong> {user.status || 'Unverified'}</p>
            </div>
          ))}
        </div>
        {selectedUser && (
          <div className={styles.selectedUserDetails}>
            <h3>User Details</h3>
            <p><strong>ID:</strong> {selectedUser.uniqueId}</p>
            <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><strong>Barangay:</strong> {selectedUser.barangay}</p>
            <p><strong>Status:</strong> {selectedUser.status || 'Unverified'}</p>
            <div className={styles.actionButtons}>
              <button className={styles.verifyButton} onClick={handleVerify}>Verify</button>
              <button className={styles.rejectButton} onClick={handleReject}>Reject</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Verify;
