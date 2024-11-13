import React, { useState } from 'react';
import axios from 'axios';

const Booklet = () => {
  const [isOCRModalOpen, setOCRModalOpen] = useState(false);
  const [isManualEntryModalOpen, setManualEntryModalOpen] = useState(false);
  const [manualEntry, setManualEntry] = useState({ balance: '', productName: '', quantity: '', percentage: '', date: '', time: '' });
  const [ocrText, setOcrText] = useState('');
  const [currentTable, setCurrentTable] = useState('medicine'); 
  const [medicineEntries, setMedicineEntries] = useState([]);
  const [groceryEntries, setGroceryEntries] = useState([]);

  const apiKey = 'a49fd44deb97df2eb9cddeaea0dd3845';
  const postApiUrl = 'https://api.mindee.net/v1/products/KentLouisArizo/pwd_booklet/v1/predict_async';

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
  
      // Periodically check the job status
      const checkJobStatus = async () => {
        const statusUrl = `https://api.mindee.net/v1/products/KentLouisArizo/pwd_booklet/v1/documents/queue/${jobId}`;
  
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
  
            if (predictions) {
              const balance = predictions.balance[0]?.value || '';
              const productName = predictions.product_name[0]?.value || '';
              const quantity = predictions.quantity[0]?.value || '';
              const percentage = predictions.percentage[0]?.value || '';
  
              const date = new Date().toLocaleDateString();
              const time = new Date().toLocaleTimeString();
  
              const entry = { balance, productName, quantity, percentage, date, time };
  
              // Check the current table and add the entry to the appropriate list
              if (currentTable === 'medicine') {
                setMedicineEntries(prevEntries => [...prevEntries, entry]);
              } else {
                setGroceryEntries(prevEntries => [...prevEntries, entry]);
              }
  
              setOcrText(`Balance: ${balance}, Product Name: ${productName}, Quantity: ${quantity}, Percentage: ${percentage}`);
            } else {
              console.warn("Predictions object is empty or missing.");
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

  const handleManualEntrySubmit = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const entry = { ...manualEntry, date, time };
  
    if (currentTable === 'medicine') {
      setMedicineEntries(prevEntries => [...prevEntries, entry]);
    } else {
      setGroceryEntries(prevEntries => [...prevEntries, entry]);
    }
    setManualEntry({ balance: '', productName: '', quantity: '', percentage: '', date: '', time: '' });
    setManualEntryModalOpen(false);
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
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {(currentTable === 'medicine' ? medicineEntries : groceryEntries).map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.balance}</td>
              <td>{entry.productName}</td>
              <td>{entry.quantity}</td>
              <td>{entry.percentage}</td>
            </tr>
          ))}
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
            onChange={handleManualEntryChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={manualEntry.quantity}
            onChange={handleManualEntryChange}
          />
          <input
            type="number"
            name="percentage"
            placeholder="Percentage"
            value={manualEntry.percentage}
            onChange={handleManualEntryChange}
          />
          <button onClick={handleManualEntrySubmit}>Add Entry</button>
          <button onClick={() => setManualEntryModalOpen(false)}>Close</button>
        </div>
      </div>
    )}
  </div>
);
};

export default Booklet;