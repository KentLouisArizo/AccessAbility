import React, { useState } from 'react';
import axios from 'axios';

const Booklet = () => {
  const [entries, setEntries] = useState([]);
  const [isOCRModalOpen, setOCRModalOpen] = useState(false);
  const [isManualEntryModalOpen, setManualEntryModalOpen] = useState(false);
  const [manualEntry, setManualEntry] = useState({ balance: '', productName: '', quantity: '', percentage: '' });
  const [ocrText, setOcrText] = useState('');

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
          console.log('Current Job Status:', status);
      
          if (status === 'completed') {
            const pages = jobStatus.data.document?.inference?.pages || [];
            
            if (pages.length > 0) {
              const predictions = pages[0].predictions || [];
              
              // Log the full prediction data for inspection
              console.log('Full Prediction Data:', predictions);
      
              if (predictions.length > 0) {
                // Attempt to extract fields dynamically
                const prediction = predictions[0];
                
                const balance = prediction?.Balance?.value || 'N/A';
                const productName = prediction?.['Product Name']?.value || 'N/A';
                const quantity = prediction?.Quantity?.value || 'N/A';
                const percentage = prediction?.Percentage?.value || 'N/A';
                
                console.log('Extracted Prediction:', { balance, productName, quantity, percentage });
      
                if (balance !== 'N/A' || productName !== 'N/A' || quantity !== 'N/A' || percentage !== 'N/A') {
                  const entry = { balance, productName, quantity, percentage };
                  setEntries(prevEntries => [...prevEntries, entry]);
                } else {
                  console.warn("Values are empty or couldn't be found.");
                }
              } else {
                console.warn("No predictions found in the completed response.");
              }
            } else {
              console.warn("No pages found in the inference object.");
            }
            setOCRModalOpen(false);
          } else if (status === 'waiting') {
            console.log("Job is waiting. Rechecking in 5 seconds...");
            setTimeout(checkJobStatus, 5000);
          } else {
            console.warn(`Job did not complete successfully: ${status}`);
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Virtual Booklet</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={() => window.print()}>Print</button>
        <button onClick={() => setOCRModalOpen(true)}>Image to Text</button>
        <button onClick={() => setManualEntryModalOpen(true)}>Manual Entry</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Balance</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.balance}</td>
              <td>{entry.productName}</td>
              <td>{entry.quantity}</td>
              <td>{entry.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default Booklet;
