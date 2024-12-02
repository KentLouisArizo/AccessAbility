import React, { useState } from 'react';
import axios from 'axios';

const Booklet = () => {
  const [isOCRModalOpen, setOCRModalOpen] = useState(false);
  const [isManualEntryModalOpen, setManualEntryModalOpen] = useState(false);
  const [manualEntry, setManualEntry] = useState({ balance: '', productName: '', quantity: '', discount: '', date: '', time: '' });
  const [ocrText, setOcrText] = useState('');
  const [currentTable, setCurrentTable] = useState('medicine');
  const [medicineEntries, setMedicineEntries] = useState([]);
  const [groceryEntries, setGroceryEntries] = useState([]);

  const apiKey = 'a49fd44deb97df2eb9cddeaea0dd3845';
  const postApiUrl = 'https://api.mindee.net/v1/products/KentLouisArizo/booklet/v1/predict_async';

  const handleOCR = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await axios.post(postApiUrl, formData, {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const jobId = response.data.job.id;
      console.log("Job ID:", jobId);

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

            const predictions = jobStatus.data?.document?.inference?.prediction;

            console.log("Predictions object:", predictions);

            if (predictions) {
              const balance = predictions.balance?.[0]?.value || '';
              const productName = predictions.product_name?.[0]?.value || '';
              const quantity = predictions.quantity?.[0]?.value || '';
              const discount = predictions.discount?.[0]?.value || '';
              const date = predictions.date ? predictions.date[0]?.value || new Date().toLocaleDateString() : new Date().toLocaleDateString();
              const time = predictions.time ? predictions.time[0]?.value || new Date().toLocaleTimeString() : new Date().toLocaleTimeString();

              const entry = { balance, productName, quantity, discount, date, time };

              addEntryToTable(entry);

              setOcrText(`Balance: ${balance}, Product Name: ${productName}, Quantity: ${quantity}, Discount: ${discount}, Date: ${date}, Time: ${time}`);
            } else {
              console.warn("Predictions object is null or undefined.");
            }

            setOCRModalOpen(false);
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
      console.error("Error with OCR:", error);
    }
  };

  const handleManualEntryChange = (e) => {
    const { name, value } = e.target;
    setManualEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleProductNameChange = (event) => {
    const { value } = event.target;
    setManualEntry((prevEntry) => ({
      ...prevEntry,
      productName: value,
    }));
  
    // Check if the product name exists in the table
    const table = currentTable === 'medicine' ? medicineEntries : groceryEntries;
  
    // Filter the table for all entries that match the product name
    const productEntries = table.filter(entry => entry.productName.toLowerCase() === value.toLowerCase());
  
    if (productEntries.length > 0) {
      // Sort the entries by date (newest first) to get the most recent entry
      const sortedEntries = productEntries.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (latest first)
      const mostRecentEntry = sortedEntries[0]; // Take the most recent entry
  
      // Calculate the balance by subtracting quantity from total
      const totalBalance = parseFloat(mostRecentEntry.balance || 0) - parseFloat(mostRecentEntry.quantity || 0);
      const discount = parseFloat(mostRecentEntry.discount || 0); // Fetch the discount as well
  
      // Set both balance and discount in the manual entry state
      setManualEntry((prevEntry) => ({
        ...prevEntry,
        balance: totalBalance.toFixed(2), // Autofill balance with the most recent total
        discount: discount.toFixed(2), // Autofill discount with the most recent discount
      }));
    } else {
      // If no matching product is found, reset the balance and discount fields
      setManualEntry((prevEntry) => ({
        ...prevEntry,
        balance: '', // Reset balance if no match is found
        discount: '', // Reset discount if no match is found
      }));
    }
  };
  
  const handleManualEntrySubmit = () => {
    const { productName, balance, quantity, discount, date, time } = manualEntry;
  
    // Validate balance before submitting
    if (parseFloat(balance) <= 0) {
      alert('Insufficient Balance');
      return; // Prevent further actions if balance is zero or negative
    }
  
    // Check if the product name exists in the current table
    const table = currentTable === 'medicine' ? medicineEntries : groceryEntries;
    const existingEntry = table.find(entry => entry.productName.toLowerCase() === productName.toLowerCase());
  
    if (existingEntry) {
      // If the product exists, update the table by adding a new row with the new balance and other details
      const newEntry = {
        productName,
        balance,
        quantity,
        discount,
        date,
        time,
        totalBalance: (parseFloat(existingEntry.balance) - parseFloat(quantity)).toFixed(2), // New balance after deduction
      };
  
      // Add new entry to the table (this will display as a new row)
      addEntryToTable(newEntry);
    } else {
      // If the product doesn't exist, add a new entry with the initial details
      const newEntry = { productName, balance, quantity, discount, date, time };
      addEntryToTable(newEntry);
    }
  
    // Clear the manual entry form after submission
    setManualEntry({ balance: '', productName: '', quantity: '', discount: '', date: '', time: '' });
    setManualEntryModalOpen(false);
  };
  
  const addEntryToTable = (entry) => {
    const discount = parseFloat(entry.discount || 0);
    if (discount >= 20) {
      setMedicineEntries((prevEntries) => [...prevEntries, { ...entry, discount }]);
    } else {
      setGroceryEntries((prevEntries) => [...prevEntries, { ...entry, discount }]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Virtual Booklet</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={handlePrint}>Print</button>
        <button onClick={() => setOCRModalOpen(true)}>Image to Text</button>
        <button onClick={() => setManualEntryModalOpen(true)}>Manual Entry</button>
        <button onClick={() => setCurrentTable(currentTable === 'medicine' ? 'grocery' : 'medicine')}>
          Switch to {currentTable === 'medicine' ? 'Grocery' : 'Medicine'} Table
        </button>
      </div>

      <div id="printable-area" style={{ width: '100%' }}>
        <h3>{currentTable === 'medicine' ? 'Medicine' : 'Grocery'} Table</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Balance</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Total</th> {/* New column for Total */}
            </tr>
          </thead>
          <tbody>
            {(currentTable === 'medicine' ? medicineEntries : groceryEntries).map((entry, index) => {
              // Calculate the Total (Balance - Quantity)
              const total = parseFloat(entry.balance || 0) - parseFloat(entry.quantity || 0);
              return (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.balance}</td>
                  <td>{entry.productName}</td>
                  <td>{entry.quantity}</td>
                  <td>{entry.discount}</td>
                  <td>{total}</td> {/* Display the Total */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* OCR Modal */}
      {isOCRModalOpen && (
        <div style={{
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '300px' }}>
            <h3>Image to Text</h3>
            <input type="file" onChange={handleOCR} />
            {ocrText && (
              <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', maxHeight: '100px', overflowY: 'auto' }}>
                <strong>Extracted Text:</strong>
                <p>{ocrText}</p>
              </div>
            )}
            <button onClick={() => setOCRModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Manual Entry Modal */}
      {isManualEntryModalOpen && (
        <div style={{
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '300px' }}>
            <h3>Manual Entry</h3>
            <input
              type="text"
              name="balance"
              placeholder="Balance"
              value={manualEntry.balance}
              onChange={handleManualEntryChange}
            />
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={manualEntry.productName}
              onChange={handleProductNameChange}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={manualEntry.quantity}
              onChange={handleManualEntryChange}
            />
            <input
              type="text"
              name="discount"
              placeholder="Discount"
              value={manualEntry.discount}
              onChange={handleManualEntryChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={manualEntry.date}
              onChange={handleManualEntryChange}
            />
            <input
              type="time"
              name="time"
              placeholder="Time"
              value={manualEntry.time}
              onChange={handleManualEntryChange}
            />
            <button onClick={handleManualEntrySubmit}>Submit</button>
            <button onClick={() => setManualEntryModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booklet;
