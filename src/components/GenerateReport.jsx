import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement, 
  LineElement, 
  PointElement, 
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import styles from '../components/styles/GenerateReport.module.css';

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const GenerateReport = () => {
  const [reportData, setReportData] = useState({
    totalByAddress: {},
    totalByAge: {},
    totalByDisability: {},
    totalByBloodType: {},
  });
  const [chartType, setChartType] = useState('pie'); 
  const [dataCategory, setDataCategory] = useState('disability'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        const data = querySnapshot.docs.map(doc => doc.data());

        const report = {
          totalByAddress: {},
          totalByAge: {},
          totalByDisability: {},
          totalByBloodType: {},
        };

        data.forEach((user) => {
          const addressKey = `${user.barangay}, ${user.municipality}, ${user.province}`;
          report.totalByAddress[addressKey] = (report.totalByAddress[addressKey] || 0) + 1;
          report.totalByAge[user.age] = (report.totalByAge[user.age] || 0) + 1;
          report.totalByDisability[user.disabilityType] = (report.totalByDisability[user.disabilityType] || 0) + 1;
          report.totalByBloodType[user.bloodType] = (report.totalByBloodType[user.bloodType] || 0) + 1;
        });

        setReportData(report);
      } catch (error) {
        console.error('Error fetching data for report: ', error);
      }
    };

    fetchData();
  }, []);

  const getChartData = () => {
    let labels = [];
    let data = [];

    switch (dataCategory) {
      case 'barangay':
        labels = Object.keys(reportData.totalByAddress);
        data = Object.values(reportData.totalByAddress);
        break;
      case 'age':
        labels = Object.keys(reportData.totalByAge);
        data = Object.values(reportData.totalByAge);
        break;
      case 'disability':
        labels = Object.keys(reportData.totalByDisability);
        data = Object.values(reportData.totalByDisability);
        break;
      case 'bloodType':
        labels = Object.keys(reportData.totalByBloodType);
        data = Object.values(reportData.totalByBloodType);
        break;
      default:
        labels = Object.keys(reportData.totalByDisability);
        data = Object.values(reportData.totalByDisability);
        break;
    }

    return {
      labels: labels,
      datasets: [
        {
          label: `Total by ${dataCategory}`,
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const renderChart = () => {
    const chartData = getChartData();

    switch (chartType) {
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      default:
        return <Pie data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportContent}>
        <h2>Generate Report</h2>
        <p className={styles.placeholderText}>
          Select a chart type and a data category to view the summary of the report.
        </p>

        <div className={styles.chartTypeSelector}>
          <label htmlFor="chartType">Choose Chart Type:</label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className={styles.chartSelector}
          >
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>

        <div className={styles.dataCategorySelector}>
          <label htmlFor="dataCategory">Choose Data Category:</label>
          <select
            id="dataCategory"
            value={dataCategory}
            onChange={(e) => setDataCategory(e.target.value)}
            className={styles.chartSelector}
          >
            <option value="barangay">Barangay</option>
            <option value="age">Age</option>
            <option value="disability">Disability Type</option>
            <option value="bloodType">Blood Type</option>
          </select>
        </div>

        <div className={styles.chartContainer}>
          {renderChart()}
        </div>

      </div>
    </div>
  );
};

export default GenerateReport;
