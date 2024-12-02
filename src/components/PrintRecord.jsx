import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Ensure this is correctly set up
import styles from './styles/PrintRecord.module.css';
import logo from '../imgs/PDAOlogo.png';
import notificationIcon from '../imgs/notification.png';
import profileIcon from '../imgs/profilelogo.png';

const PrintRecord = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        const recordsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecords(recordsList);
      } catch (error) {
        console.error('Error fetching records: ', error);
      }
    };

    fetchRecords();
  }, []);

  const handleSelectRecord = (recordId) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(recordId)
        ? prevSelected.filter((id) => id !== recordId)
        : [...prevSelected, recordId]
    );
  };

  const generatePrintableContent = (data) => {
    return `
      <html>
        <head>
          <title>Print Records</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #004d99; color: white; }
            h2 { text-align: center; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h2>User Records</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Barangay</th>
                <th>Disability Type</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (record) => `
                <tr>
                  <td>${record.uniqueID || 'N/A'}</td>
                  <td>${record.firstName} ${record.lastName}</td>
                  <td>${record.barangay}</td>
                  <td>${record.disabilityType || 'N/A'}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const handlePrintSelected = () => {
    if (selectedRecords.length === 0) {
      alert('No records selected for printing.');
      return;
    }

    const selectedData = records.filter((record) =>
      selectedRecords.includes(record.id)
    );

    const printWindow = window.open('', '_blank');
    printWindow.document.write(generatePrintableContent(selectedData));
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handlePrintAll = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generatePrintableContent(records));
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className={styles.printRecordContainer}>
      <header className={styles.header}>
        <img src={logo} alt="AccessAbility Logo" className={styles.logo} />
        <h2 className={styles.welcomeMessage}>Welcome! Admin</h2>
        <div className={styles.icons}>
          <img
            src={notificationIcon}
            alt="Notifications"
            className={styles.icon}
          />
          <img src={profileIcon} alt="Profile" className={styles.icon} />
        </div>
      </header>

      <main className={styles.body}>
        <h3 className={styles.sectionTitle}>Print Record Section</h3>
        <div className={styles.recordOptions}>
          <div className={styles.option}>
            <button className={styles.printButton} onClick={handlePrintAll}>
              Print All Records
            </button>
          </div>
          <div className={styles.option}>
            <button
              className={styles.printButton}
              onClick={handlePrintSelected}
              disabled={selectedRecords.length === 0}
            >
              Print Selected Records
            </button>
          </div>
        </div>

        <div className={styles.recordTable}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Barangay</th>
                <th>Disability Type</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.uniqueID || 'N/A'}</td>
                  <td>
                    {record.firstName} {record.lastName}
                  </td>
                  <td>{record.barangay}</td>
                  <td>{record.disabilityType || 'N/A'}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => handleSelectRecord(record.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PrintRecord;
