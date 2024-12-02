import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styles/Verify.module.css';
import PDAOlogo from '../imgs/PDAOlogo.png';
import bellIcon from '../imgs/notification.png';
import userProfileIcon from '../imgs/profilelogo.png';

const Verify = ({ showVerified, setShowVerified, redirectUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const userRowRef = useRef(null); // Ref to scroll to the user row

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter users based on verified status
        const filteredUsers = showVerified
          ? usersList.filter((user) => user.isVerified === true) // Verified users
          : usersList.filter((user) => user.isVerified === false); // Unverified users

        setUsers(filteredUsers);

        // Auto-select the redirected user
        if (redirectUser) {
          const userToSelect = filteredUsers.find((user) => user.uniqueID === redirectUser);
          if (userToSelect) {
            setSelectedUser(userToSelect);

            // Scroll to the user row after the DOM is updated
            setTimeout(() => {
              if (userRowRef.current) {
                userRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          }
        }
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, [showVerified, redirectUser]);

  const handleVerify = async () => {
    if (selectedUser) {
      const userRef = doc(db, 'registrations', selectedUser.id);
      try {
        await updateDoc(userRef, { isVerified: true });
        alert(`User ${selectedUser.uniqueID} verified successfully`);

        // Remove verified user from the list and clear selected user
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setSelectedUser(null);
      } catch (error) {
        console.error('Error verifying user: ', error);
        alert('There was an issue verifying the user.');
      }
    }
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
        <h2 className={styles.title}>{showVerified ? 'Verified Users' : 'Unverified Users'}</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Barangay</th>
              <th>Status</th>
              {showVerified ? null : <th>Actions</th>} {/* Show actions only for unverified */ }
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                ref={redirectUser === user.uniqueID ? userRowRef : null} // Attach ref to the redirected user row
                className={redirectUser === user.uniqueID ? styles.highlightedRow : ''} // Add a highlight style
                onClick={() => setSelectedUser(user)}
              >
                <td>{user.uniqueID}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.barangay}</td>
                <td>{user.isVerified ? 'Verified' : 'Unverified'}</td>
                {showVerified ? null : (
                  <td>
                    <button onClick={handleVerify}>Verify</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && !showVerified && (
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
      </main>
    </div>
  );
};

export default Verify;
