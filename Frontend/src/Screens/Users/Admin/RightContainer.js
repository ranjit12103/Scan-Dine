import React from 'react';
import AdminHome from './AdminHome';

import AdminChangePassword from './AdminChangePassword';
import AdminViewMessages from './AdminViewMessages';
import CreateRestaurantAccount from './CreateRestaurantAccount';
import AdminProfileView from './AdminprofileView';
import ManageRestaurants from './ManageRestaurants';

const RightContainer = ({ activeView }) => {
  const renderComponent = () => {
    switch (activeView) {
      case 'home':
        return <AdminHome />;
      case 'profile':
        return <AdminProfileView />;
      case 'changePassword':
        return <AdminChangePassword />;
      case 'messages':
        return <AdminViewMessages />;
      case 'restaurant':
        return <CreateRestaurantAccount />;
        case 'manageRestaurant':
          return <ManageRestaurants />;
        
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className='dashboard-content'>
      <div className='container'>
        {renderComponent()}
      </div>
    </div>
  );
};

export default RightContainer;
