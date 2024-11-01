import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const Booklet = () => {
  const [entries, setEntries] = useState([]);
  const [isOCRModalOpen, setOCRModalOpen] = useState(false);
  const [isManualEntryModalOpen, setManualEntryModalOpen] = useState(false);
  const [manualEntry, setManualEntry] = useState({ balance: '', productName: '', quantity: '', percentage: '' });
  const [ocrText, setOcrText] = useState('');

  const handleAddEntry = () => {
    setEntries([...entries, manualEntry]);
    setManualEntry({ balance: '', productName: '', quantity: '', percentage: '' });
    setManualEntryModalOpen(false);
  };

  const handleOCR = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      setOcrText(text);

      // Extract relevant fields from the OCR text
      const extractedEntry = {
        balance: text.match(/Balance:\s*(\S+)/)?.[1] || '',
        productName: text.match(/Product Name:\s*(\S+)/)?.[1] || '',
        quantity: text.match(/Quantity:\s*(\S+)/)?.[1] || '',
        percentage: text.match(/Percentage:\s*(\S+)/)?.[1] || '',
      };

      // Check if the extracted entry has all necessary fields before adding
      if (extractedEntry.balance && extractedEntry.productName && extractedEntry.quantity && extractedEntry.percentage) {
        setEntries([...entries, extractedEntry]);
      } else {
        alert("The OCR text did not contain all necessary information for a valid entry.");
      }
      
      setOCRModalOpen(false);
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

      {/* Manual Entry Modal */}
      {isManualEntryModalOpen && (
        <div style={{
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
            <h3>Manual Entry</h3>
            <input
              type="text"
              placeholder="Balance"
              value={manualEntry.balance}
              onChange={(e) => setManualEntry({ ...manualEntry, balance: e.target.value })}
            />
            <input
              type="text"
              placeholder="Product Name"
              value={manualEntry.productName}
              onChange={(e) => setManualEntry({ ...manualEntry, productName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Quantity"
              value={manualEntry.quantity}
              onChange={(e) => setManualEntry({ ...manualEntry, quantity: e.target.value })}
            />
            <input
              type="text"
              placeholder="Percentage"
              value={manualEntry.percentage}
              onChange={(e) => setManualEntry({ ...manualEntry, percentage: e.target.value })}
            />
            <button onClick={handleAddEntry}>Add Entry</button>
            <button onClick={() => setManualEntryModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booklet;
