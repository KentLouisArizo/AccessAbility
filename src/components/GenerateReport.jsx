import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Adjust the path if needed
import styles from '../components/styles/GenerateReport.module.css';

const GenerateReport = () => {
  const [reportData, setReportData] = useState({
    totalByAddress: {},
    totalByAge: {},
    totalByDisability: {},
    totalByBloodType: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        const data = querySnapshot.docs.map(doc => doc.data());

        // Organize data for the report
        const report = {
          totalByAddress: {},
          totalByAge: {},
          totalByDisability: {},
          totalByBloodType: {},
        };

        data.forEach((user) => {
          // Group by address
          const addressKey = `${user.barangay}, ${user.municipality}, ${user.province}`;
          report.totalByAddress[addressKey] = (report.totalByAddress[addressKey] || 0) + 1;

          // Group by age
          report.totalByAge[user.age] = (report.totalByAge[user.age] || 0) + 1;

          // Group by disability type
          report.totalByDisability[user.disabilityType] = (report.totalByDisability[user.disabilityType] || 0) + 1;

          // Group by blood type
          report.totalByBloodType[user.bloodType] = (report.totalByBloodType[user.bloodType] || 0) + 1;
        });

        setReportData(report);
      } catch (error) {
        console.error('Error fetching data for report: ', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerateReport = () => {
    // You can add more complex logic here, but for now, this just alerts a simple summary
    alert('Report generated successfully!');
  };

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportContent}>
        <h2>Generate Report</h2>
        <p className={styles.placeholderText}>
          The following report summarizes the number of people by address, age, disability type, and blood type.
        </p>

        <div className={styles.reportSection}>
          <h3>Report Summary</h3>

          <div className={styles.reportCategory}>
            <h4>Total by Address</h4>
            <ul>
              {Object.entries(reportData.totalByAddress).map(([address, count]) => (
                <li key={address}>{address}: {count} people</li>
              ))}
            </ul>
          </div>

          <div className={styles.reportCategory}>
            <h4>Total by Age</h4>
            <ul>
              {Object.entries(reportData.totalByAge).map(([age, count]) => (
                <li key={age}>{age} years old: {count} people</li>
              ))}
            </ul>
          </div>

          <div className={styles.reportCategory}>
            <h4>Total by Disability Type</h4>
            <ul>
              {Object.entries(reportData.totalByDisability).map(([disability, count]) => (
                <li key={disability}>{disability}: {count} people</li>
              ))}
            </ul>
          </div>

          <div className={styles.reportCategory}>
            <h4>Total by Blood Type</h4>
            <ul>
              {Object.entries(reportData.totalByBloodType).map(([bloodType, count]) => (
                <li key={bloodType}>{bloodType}: {count} people</li>
              ))}
            </ul>
          </div>
        </div>

        <button className={styles.generateButton} onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default GenerateReport;
