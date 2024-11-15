import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const handleLogout = () => {
    // Logic for logout
    console.log('User logged out');
  };

  const goToProfile = () => {
    // Logic for navigating to the profile page
    console.log('Navigate to Profile');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          padding: '10px 20px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <h2 style={{ margin: 0 }}>Welcome to Sanjukta</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Profile Button */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px',
            }}
            onClick={goToProfile}
            title="Profile"
          >
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '15px' }} />
          </button>

          {/* Logout Button */}
          <button
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Dashboard Content</h1>
        <p>Welcome to your dashboard! Explore the features here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
