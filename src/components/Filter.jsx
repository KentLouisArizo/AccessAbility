import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styles/Filter.module.css';

const Filter = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [disabilityTypes, setDisabilityTypes] = useState([]);
  const [bloodTypes, setBloodTypes] = useState([]);

  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [selectedDisabilityType, setSelectedDisabilityType] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations')); // Ensure the collection name is correct
        const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        setFilteredUsers(usersList); // Initialize filteredUsers with the complete user list
        // Extract unique barangays, disability types, and blood types
        const uniqueBarangays = [...new Set(usersList.map((user) => user.barangay))];
        const uniqueDisabilityTypes = [...new Set(usersList.map((user) => user.disabilityType))];
        const uniqueBloodTypes = [...new Set(usersList.map((user) => user.bloodType))];

        setBarangays(uniqueBarangays);
        setDisabilityTypes(uniqueDisabilityTypes);
        setBloodTypes(uniqueBloodTypes);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filtered = users.filter((user) => {
      const userIdMatch = user.uniqueID && user.uniqueID.includes(searchTerm); // Check if uniqueId exists
      const nameMatch = user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase()); // Check if firstName exists
      const barangayMatch = selectedBarangay ? user.barangay === selectedBarangay : true;
      const disabilityMatch = selectedDisabilityType ? user.disabilityType === selectedDisabilityType : true;
      const bloodMatch = selectedBloodType ? user.bloodType === selectedBloodType : true;

      return (userIdMatch || nameMatch) && barangayMatch && disabilityMatch && bloodMatch;
    });
    setFilteredUsers(filtered); // Update the filtered users
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Filter Users</h2>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by ID or Name"
          className={styles.searchInput}
          value={searchTerm} // This ensures the input reflects state changes
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className={styles.filterOptions}>
        <select
          className={styles.filterSelect}
          value={selectedBarangay}
          onChange={(e) => setSelectedBarangay(e.target.value)}
        >
          <option value="">Select Barangay</option>
          {barangays.map((barangay, index) => (
            <option key={index} value={barangay}>
              {barangay}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={selectedDisabilityType}
          onChange={(e) => setSelectedDisabilityType(e.target.value)}
        >
          <option value="">Select Disability Type</option>
          {disabilityTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={selectedBloodType}
          onChange={(e) => setSelectedBloodType(e.target.value)}
        >
          <option value="">Select Blood Type</option>
          {bloodTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredUsers.length > 0 ? (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Barangay</th>
              <th>Disability Type</th>
              <th>Blood Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.uniqueID || 'N/A'}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.barangay || 'N/A'}</td>
                <td>{user.disabilityType || 'N/A'}</td>
                <td>{user.bloodType || 'N/A'}</td>
                <td>{user.isVerified ? 'Verified' : 'Unverified'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Filter;
