import React, { useState } from 'react';
import Filter from './Filter';
import Verify from './Verify'; 
import Reset from './Reset';
import styles from '../components/styles/User.module.css';

const User = () => {
  const [activeTab, setActiveTab] = useState('filter');
  const [showVerified, setShowVerified] = useState(false); 
  const renderContent = () => {
    switch (activeTab) {
      case 'filter':
        return <Filter />;
      case 'verify':
        return <Verify showVerified={showVerified} setShowVerified={setShowVerified} />;
      case 'reset':
        return <Reset />;
      default:
        return <Filter />;
    }
  };

  return (
    <div className={styles.userContainer}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'filter' ? styles.active : ''}`}
          onClick={() => setActiveTab('filter')}
        >
          Search Filter
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'verify' ? styles.active : ''}`}
          onClick={() => setActiveTab('verify')}
        >
          Verify User
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'reset' ? styles.active : ''}`}
          onClick={() => setActiveTab('reset')}
        >
          Reset Password
        </div>
      </div>
      {activeTab === 'verify' && (
        <div className={styles.toggleButton}>
          <button
            onClick={() => setShowVerified(false)}
            className={!showVerified ? styles.active : ''}
          >
            Unverified Users
          </button>
          <button
            onClick={() => setShowVerified(true)}
            className={showVerified ? styles.active : ''}
          >
            Verified Users
          </button>
        </div>
      )}
      <div className={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default User;
