import React from 'react';
import { Outlet } from 'react-router-dom';
import PanelNavigation from '../components/panelNavigation/PanelNavigation';
import './Layout.css';
import Sidebar from '../components/sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar role="admin" />
      {/* Main content */}
      <div className="admin-main">
        <PanelNavigation role="Admin" />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
