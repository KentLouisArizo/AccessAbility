import React, { useState, useEffect } from 'react';
import RenderBookletUpdate from './RenderBookletUpdate';
import RequestBooklet from './RequestBooklet';
import styles from '../components/styles/User.module.css';

const UpdateBooklet = ({ defaultTab = 'request', redirectUser = null }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    // Update states based on default props if provided
    setActiveTab(defaultTab);

    // Redirect logic: if a redirectUser is provided, switch to the appropriate tab
    if (redirectUser) {
      setActiveTab('request');
    }
  }, [defaultTab, redirectUser]);

  const renderContent = () => {
    switch (activeTab) {
      case 'request':
        return <RequestBooklet />;
      case 'update':
        return <RenderBookletUpdate />;
      default:
        return <RequestBooklet />;
    }
  };

  return (
    <div className={styles.userContainer}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'request' ? styles.active : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Request Update
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'update' ? styles.active : ''}`}
          onClick={() => setActiveTab('update')}
        >
          View Update Requests
        </div>
      </div>
      <div className={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UpdateBooklet;
