import React from 'react';

const AdminSider = ({ isOpen, toggleSidebar, onSelectView }) => {

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location = "/";
  };

  return (
    <div className={`dashboard-nav ${isOpen ? 'mobile-show' : ''}`}>
      <header>
        <a href="#!" className="menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </a>
        <a href="#" className="brand-logo">
          <i className="fa fa-coffee"></i> <span>Scan & Dine</span>
        </a>
      </header>
      <nav className="dashboard-nav-list">
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('home')}>
          <i className="fas fa-home"></i> Home
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('profile')}>
          <i className="fas fa-user"></i> Your Profile
        </a>
        {/* <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('changePassword')}>
          <i className="fas fa-key"></i> Change Password
        </a> */}
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('messages')}>
          <i className="fas fa-envelope"></i> Messages
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('restaurant')}>
          <i className="fas fa-utensils"></i> Add Restaurant
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('manageRestaurant')}>
          <i className="fas fa-cogs"></i> Manage Restaurant
        </a>
        <div className="nav-item-divider"></div>
        <a href="#!" className="dashboard-nav-item" onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </nav>
    </div>
  );
};

export default AdminSider;
