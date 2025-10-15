import React, { useState } from 'react';
import '../../../Styles/AdminDashboard.css'; 
import AdminSider from './AdminSider';
import RightContainer from './RightContainer';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectView = (view) => {
    setActiveView(view);
  };

  return (
    <div className={`dashboard ${isSidebarOpen ? 'dashboard-compact' : ''}`}>
      <AdminSider 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onSelectView={handleSelectView} 
      />
      <div className='dashboard-app'>
        <header className='dashboard-toolbar d-flex justify-content-between align-items-center'>
          <a href="#!" className="menu-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </a>
          <span
            style={{
              fontWeight: 'bold', 
              fontSize: '1.2rem', 
              marginLeft: 'auto' ,
              color:"#ffd800" 
            }}
          >
            Admin Dashboard
          </span>
        </header>
        <RightContainer activeView={activeView} />
      </div>
    </div>
  );
};

export default AdminDashboard;
