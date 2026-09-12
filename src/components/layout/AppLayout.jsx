import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { MainContent } from './MainContent';
import { NotificationDrawer } from '../navigation/NotificationDrawer';

export const AppLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <TopNavbar />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
      <NotificationDrawer />
    </div>
  );
};
