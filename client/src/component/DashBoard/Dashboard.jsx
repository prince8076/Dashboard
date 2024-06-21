import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../Sidebar';
import AnalyticsOverview from '../Analytics/AnalyticsOverview';
import ProjectStats from '../ProjectStats/ProjectStats';
import DashboardOverview from '../DashboardOverview';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="analytics" element={<AnalyticsOverview />} />
            <Route path="projects" element={<ProjectStats />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
