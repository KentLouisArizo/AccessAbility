import React from 'react';
import styles from '../components/styles/GenerateReport.module.css';

const GenerateReport = () => {
  const handleGenerateReport = () => {
    // Placeholder for future report generation logic
    alert('Report generation is currently under development.');
  };

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportContent}>
        <h2>Generate Report</h2>
        <p className={styles.placeholderText}>
          Report generation functionality will be available soon. 
          Click the button below to generate a sample report.
        </p>
        <button className={styles.generateButton} onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default GenerateReport;
