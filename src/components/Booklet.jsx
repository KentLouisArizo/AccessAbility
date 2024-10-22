import React, { useState } from 'react';
import styles from './styles/Booklet.module.css';

const Booklet = () => {
  const [balance, setBalance] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [percentage, setPercentage] = useState('');
  const [entries, setEntries] = useState([]); // To store the inputs

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the current input to the entries array
    const newEntry = {
      balance,
      productName,
      quantity,
      percentage,
    };

    setEntries([...entries, newEntry]);

    // Reset the form fields after submission
    setBalance('');
    setProductName('');
    setQuantity('');
    setPercentage('');
  };

  return (
    <div className={styles.bookletContainer}>
      <h2>Booklet Information</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="balance">Balance:</label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Enter balance"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="percentage">Percentage:</label>
          <input
            type="number"
            id="percentage"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter percentage"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Display the inputted data in a table */}
      {entries.length > 0 && (
        <table className={styles.table}>
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
                <td>{entry.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Booklet;
