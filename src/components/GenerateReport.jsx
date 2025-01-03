import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import plugin
import { Pie } from 'react-chartjs-2';
import styles from '../components/styles/GenerateReport.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // Register plugin

const GenerateReport = () => {
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    barangay: [],
    age: [],
    disability: [],
    bloodType: [],
    educationalAttainment: [],
    employmentCategory: [],
    employmentStatus: [],
  });
  const [filterOptions, setFilterOptions] = useState({
    barangay: [],
    age: [],
    disability: [],
    bloodType: [],
    educationalAttainment: [],
    employmentCategory: [],
    employmentStatus: [],
  });

  // Fetch unique options and all registration data
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrations'));
        const data = querySnapshot.docs.map((doc) => doc.data());

        // Extract unique values for each field
        const uniqueValues = (key) =>
          [...new Set(data.map((item) => item[key]).filter(Boolean))].map((value) => ({
            value,
            label: value,
          }));

        setFilterOptions({
          barangay: uniqueValues('barangay'),
          age: uniqueValues('age'),
          disability: uniqueValues('disabilityType'),
          bloodType: uniqueValues('bloodType'),
          educationalAttainment: uniqueValues('educationalAttainment'),
          employmentCategory: uniqueValues('employmentCategory'),
          employmentStatus: uniqueValues('employmentStatus'),
        });

        setReportData(data); // Store raw data for dynamic filtering
      } catch (error) {
        console.error('Error fetching data for report: ', error);
      }
    };

    fetchOptions();
  }, []);

  // Handle multi-select changes
  const handleSelectChange = (selectedOptions, category) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: selectedValues,
    }));
  };

  // Filter data based on selected filters
  const filteredData = reportData.filter((user) => {
    return (
      (!filters.barangay.length || filters.barangay.includes(user.barangay)) &&
      (!filters.age.length || filters.age.includes(String(user.age))) &&
      (!filters.disability.length || filters.disability.includes(user.disabilityType)) &&
      (!filters.bloodType.length || filters.bloodType.includes(user.bloodType)) &&
      (!filters.educationalAttainment.length ||
        filters.educationalAttainment.includes(user.educationalAttainment)) &&
      (!filters.employmentCategory.length ||
        filters.employmentCategory.includes(user.employmentCategory)) &&
      (!filters.employmentStatus.length ||
        filters.employmentStatus.includes(user.employmentStatus))
    );
  });

  // Aggregate data and dynamically create labels
  const aggregatedData = filteredData.reduce((acc, user) => {
    const labelParts = [];
    if (user.barangay && filters.barangay.length) labelParts.push(user.barangay);
    if (user.disabilityType && filters.disability.length) labelParts.push(user.disabilityType);
    if (user.age && filters.age.length) labelParts.push(`Age: ${user.age}`);
    if (user.bloodType && filters.bloodType.length) labelParts.push(`Blood: ${user.bloodType}`);
    if (
      user.educationalAttainment &&
      filters.educationalAttainment.length
    )
      labelParts.push(user.educationalAttainment);
    if (user.employmentCategory && filters.employmentCategory.length)
      labelParts.push(user.employmentCategory);
    if (user.employmentStatus && filters.employmentStatus.length)
      labelParts.push(user.employmentStatus);

    const label = labelParts.join(', ') || 'Uncategorized';
    acc[label] = (acc[label] || 0) + 1;

    return acc;
  }, {});

  const totalFiltered = filteredData.length;

  // Prepare chart data with percentages
  const getChartData = () => {
    const labels = Object.keys(aggregatedData);
    const rawData = Object.values(aggregatedData);
    const percentages = rawData.map((value) => ((value / totalFiltered) * 100).toFixed(2));

    return {
      labels,
      datasets: [
        {
          label: 'Percentage (%)',
          data: rawData,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
      percentages, // Add percentages to be used for tooltips
    };
  };

  // Chart options to display percentages on the pie chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: '#fff',
        font: {
          size: 14,
        },
        formatter: (value, context) => {
          const chartData = getChartData();
          const label = chartData.labels[context.dataIndex];
          const percentage = chartData.percentages[context.dataIndex];
          return `${label}\n(${percentage}%)`; // Combine label and percentage
        },
      },
      legend: {
        display: false, // Hide the default legend
      },
    },
  };  

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportContent}>
        <h2>Generate Report</h2>

        <div className={styles.filters}>
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <h4>{key.replace(/([A-Z])/g, ' $1')}</h4>
              <Select
                options={options}
                isMulti
                onChange={(selected) => handleSelectChange(selected, key)}
              />
            </div>
          ))}
        </div>

        <div className={styles.chartContainer}>
          <Pie data={getChartData()} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
