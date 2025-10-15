import React from 'react';

const RestaurantSider = ({ isOpen, toggleSidebar, onSelectView }) => {


  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("restaurantId");
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
        {/* <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('home')}>
          <i className="fas fa-home"></i> Home
        </a> */}
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('addFoodCategory')}>
          <i className="fas fa-tags"></i> Add Food Category
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('viewFoodCategory')}>
          <i className="fas fa-list-alt"></i> View Food Category
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('addFoodItems')}>
          <i className="fas fa-plus-circle"></i> Add Food Items
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('viewFoodCollection')}>
          <i className="fas fa-list"></i> View Food Collection
        </a>
        {/* <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('customers')}>
          <i className="fas fa-users"></i> Customers
        </a> */}
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('manageTables')}>
          <i className="fas fa-table"></i> Manage Tables
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('Addcustomers')}>
          <i className="fas fa-user"></i> Customers
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('ViewCustomers')}>
          <i className="fas fa-user"></i> ViewCustomers
        </a>
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('profile')}>
          <i className="fas fa-user"></i> Your Profile
        </a>
    
      
        <a href="#!" className="dashboard-nav-item" onClick={() => onSelectView('viewQRCode')}>
          <i className="fas fa-qrcode"></i> View QR Code
        </a>
        <div className="nav-item-divider"></div>
        <a href="#!" className="dashboard-nav-item" onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </nav>
    </div>
  );
};

export default RestaurantSider;
