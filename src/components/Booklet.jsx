import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/Booklet.module.css';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query } from 'firebase/firestore';  // Add query import

const Booklet = () => {
  const [isRequestUpdateModalOpen, setRequestUpdateModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState('medicine');
  const [medicineEntries, setMedicineEntries] = useState([]);
  const [groceryEntries, setGroceryEntries] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const apiKey = 'a49fd44deb97df2eb9cddeaea0dd3845';
  const postApiUrl = 'https://api.mindee.net/v1/products/KentLouisArizo/booklet/v1/predict_async';
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchEntries = async () => {
        const userCollection = collection(db, 'users', currentUser.uid, currentTable);
        const q = query(userCollection);
        const querySnapshot = await getDocs(q);

        const entries = querySnapshot.docs.map((doc) => doc.data());
        if (currentTable === 'medicine') {
          setMedicineEntries(entries);
        } else {
          setGroceryEntries(entries);
        }
      };

      fetchEntries();
    }
  }, [currentUser, currentTable, db]);

  const upload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleRequestUpdateSubmit = async () => {
    if (!imageFile) {
      alert('Please upload an image to request an update.');
      return;
    }
  
    const formData = new FormData();
    formData.append('document', imageFile);
  
    try {
      const response = await axios.post(postApiUrl, formData, {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const jobId = response.data.job.id;
      console.log("Job ID:", jobId);
  
      // Save request to Firestore's 'requestbookletupdate' collection
      const requestRef = await addDoc(collection(db, 'requestbookletupdate'), {
        userId: currentUser.uid,
        jobId: jobId,
        imageFile: imageFile.name,
        status: 'pending', // Initial status of the request
        timestamp: new Date(),
      });
  
      console.log("Request update saved to Firestore:", requestRef.id);
  
      const checkJobStatus = async () => {
        const statusUrl = `https://api.mindee.net/v1/products/KentLouisArizo/booklet/v1/documents/queue/${jobId}`;
        try {
          const jobStatus = await axios.get(statusUrl, {
            headers: {
              'Authorization': `Token ${apiKey}`,
            },
          });
  
          const status = jobStatus.data.job.status;
          console.log(`Current Job Status: ${status}`);
  
          if (status === 'completed') {
            console.log("Job completed, full response data:", jobStatus.data);
  
            // Handle job completion here, update Firestore or notify the admin
            alert('Your update request has been processed successfully.');
  
            setRequestUpdateModalOpen(false);
          } else if (status === 'queued') {
            setTimeout(checkJobStatus, 3000);
          } else if (status === 'running') {
            setTimeout(checkJobStatus, 2000);
          } else if (status === 'waiting') {
            setTimeout(checkJobStatus, 5000);
          } else {
            console.warn(`Unexpected job status: ${status}`);
          }
        } catch (error) {
          console.error("Error checking job status:", error);
        }
      };
  
      checkJobStatus();
    } catch (error) {
      console.error("Error with image upload:", error);
    }
  };

  const handleSwitchTable = () => {
    setCurrentTable(currentTable === 'medicine' ? 'grocery' : 'medicine');
  };

  const handlePrint = () => {
    const content = document.getElementById('printable-area');
    const printWindow = window.open('', '', 'width=800, height=600');
    printWindow.document.write('<html><head><title>Booklet Print</title></head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Virtual Booklet</h2>
  
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handlePrint}>Print</button>
        <button className={styles.button} onClick={() => setRequestUpdateModalOpen(true)}>Request Update</button>
        <button
          className={styles.button}
          onClick={handleSwitchTable}
        >
          Switch to {currentTable === 'medicine' ? 'Grocery' : 'Medicine'} Table
        </button>
      </div>
  
      <div id="printable-area" className={styles.tableContainer}>
        <h3>{currentTable === 'medicine' ? 'Medicine' : 'Grocery'} Table</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Balance</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {(currentTable === 'medicine' ? medicineEntries : groceryEntries).map((entry, index) => {
              const total = parseFloat(entry.balance || 0) - parseFloat(entry.quantity || 0);
              return (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.balance}</td>
                  <td>{entry.productName}</td>
                  <td>{entry.quantity}</td>
                  <td>{entry.discount}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  
      {isRequestUpdateModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Request Update</h3>
            <input type="file" onChange={upload} />
            {imageFile && (
              <div className={styles.pictureContainer}>
                <strong>Uploaded Picture:</strong>
                <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className={styles.uploadedImage} />
              </div>
            )}
            <div className={styles.modalButtons}>
              <button 
                className={styles.modalButton} 
                onClick={handleRequestUpdateSubmit}
              >
                Submit Update Request
              </button>
              <button 
                className={`${styles.modalButton} ${styles.modalButtonClose}`} 
                onClick={() => setRequestUpdateModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booklet;
