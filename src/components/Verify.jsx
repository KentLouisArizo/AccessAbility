import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styles/Verify.module.css';

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

  const handleApprove = async () => {
    if (selectedUser) {
      const userRef = doc(db, 'registrations', selectedUser.id);
      try {
        await updateDoc(userRef, { isVerified: true });
        alert(`User ${selectedUser.uniqueID} approved successfully`);

        // Remove approved user from the list and clear selected user
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setSelectedUser(null);
      } catch (error) {
        console.error('Error approving user: ', error);
        alert('There was an issue approving the user.');
      }
    }
  };

  const handleReject = async () => {
    if (selectedUser) {
      const userRef = doc(db, 'registrations', selectedUser.id);
      try {
        // Delete user from Firestore
        await deleteDoc(userRef);
        alert(`User ${selectedUser.uniqueID} rejected and removed successfully`);
  
        // Remove rejected user from the UI
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setSelectedUser(null);
      } catch (error) {
        console.error('Error rejecting and removing user: ', error);
        alert('There was an issue rejecting and removing the user.');
      }
    }
  };  

  return (
    <div className={styles.verifyContainer}>
      <main className={styles.mainContent}>
        <h2 className={styles.title}>{showVerified ? 'Verified Users' : 'Unverified Users'}</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Disability</th>
              <th>Barangay</th>
              <th>Status</th>
              {showVerified ? null : <th>Actions</th>} {/* Show actions only for unverified */}
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
                <td>{user.disabilityType}</td>
                <td>{user.barangay}</td>
                <td>{user.isVerified ? 'Verified' : 'Unverified'}</td>
                {showVerified ? null : (
                  <td>
                    <button onClick={() => setSelectedUser(user)}>...</button>
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
            <p><strong>Disability:</strong> {selectedUser.disabilityType}</p>
            <p><strong>Barangay:</strong> {selectedUser.barangay}</p>
            <p><strong>Date of Birth:</strong> {selectedUser.dob}</p>
            <p><strong>Age:</strong> {selectedUser.age}</p>
            <p><strong>Sex:</strong> {selectedUser.sex}</p>
            <p><strong>Civil Status:</strong> {selectedUser.civilStatus}</p>
            <p><strong>Blood Type:</strong> {selectedUser.bloodType}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Mobile No:</strong> {selectedUser.mobileNo}</p>
            <p><strong>1 x 1 Profile Image:</strong></p>
            <img src={selectedUser.profileImageUrl} alt="1x1 Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <p><strong>Whole Body Image:</strong></p>
            <img src={selectedUser.wholeBodyImageUrl} alt="Whole Body" style={{ width: '200px', height: 'auto' }} />
            <p><strong>Medical Record:</strong></p>
            <img src={selectedUser.medicalRecordUrl} alt="Medical Record" style={{ width: '200px', height: 'auto' }} />
            <div className={styles.actionButtons}>
              <button className={styles.approveButton} onClick={handleApprove}>Approve</button>
              <button className={styles.rejectButton} onClick={handleReject}>Reject</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Verify;
