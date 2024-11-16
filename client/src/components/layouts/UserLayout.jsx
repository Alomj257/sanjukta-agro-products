import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <div className="user-sidebar">
        <p>User Sidebar</p>
      </div>
      <div className="user-main">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
