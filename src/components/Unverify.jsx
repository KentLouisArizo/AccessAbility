import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig'; // Ensure auth is imported from your Firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Use createUserWithEmailAndPassword
import styles from './styles/Unverify.module.css';
import { useNavigate } from 'react-router-dom';

const Unverify = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        const usersList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => !user.isVerified); // Fetch only unverified users
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.uniqueID.includes(searchTerm) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleVerify = async () => {
    if (selectedUser) {
      const userRef = doc(db, 'registrations', selectedUser.id);
      try {
        await createUserWithEmailAndPassword(auth, selectedUser.email, selectedUser.password);

        await updateDoc(userRef, { isVerified: true });
        await updateDoc(userRef, { isDisabled: false });
        alert('Current isDisabled value:', selectedUser.isDisabled);

        alert(`User ${selectedUser.uniqueID} verified successfully`);

        // Remove verified user from the list and clear selected user
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setSelectedUser(null);
        
      } catch (error) {
        console.error('Error verifying user: ', error);
        alert('There was an issue verifying the user or signing them in.');
      }
    }
  };

  return (
    <div className={styles.unverifyContainer}>

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
            {users.map((user) => (
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

        <button className={styles.switchButton} onClick={() => navigate('/verify')}>
          Go to Verified Users
        </button>
      </main>
    </div>
  );
};

export default Unverify;
