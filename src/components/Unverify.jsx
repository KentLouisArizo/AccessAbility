import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styles/Unverify.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import bellIcon from '../imgs/notification.png';
import userProfileIcon from '../imgs/profilelogo.png';
import { useNavigate } from 'react-router-dom';

const Unverify = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
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
      user.uniqueID.includes(searchTerm) || user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleVerify = async () => {
    if (selectedUser) {
      const userRef = doc(db, 'registrations', selectedUser.id);
      await updateDoc(userRef, { isVerified: true });
      alert(`User ${selectedUser.uniqueID} verified`);
      setUsers(users.filter(user => user.id !== selectedUser.id)); // Remove verified user from the list
    }
  };

  return (
    <div className={styles.unverifyContainer}>
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
        <h2 className={styles.title}>Unverified Users</h2>
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

        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Barangay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(user => !user.isVerified).map(user => (
              <tr key={user.id} onClick={() => handleUserClick(user)}>
                <td>{user.uniqueID}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.barangay}</td>
                <td>{user.isVerified ? 'Verified' : 'Unverified'}</td>
                <td>
                  <button className={styles.viewButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
          <div className={styles.selectedUserDetails}>
            <h3>User Details</h3>
            <p><strong>ID:</strong> {selectedUser.uniqueID}</p>
            <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><strong>Barangay:</strong> {selectedUser.barangay}</p>
            <div className={styles.actionButtons}>
              <button className={styles.verifyButton} onClick={handleVerify}>Verify</button>
            </div>
          </div>
        )}

        <button className={styles.switchButton} onClick={() => navigate('/verify')}>Go to Verified Users</button>
      </main>
    </div>
  );
};

export default Unverify;
