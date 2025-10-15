import React, { useEffect, useState } from 'react';
import '../../../Styles/AdminDashboard.css'; 
import RestaurantSider from './RestaurantSider';
import RightContainer from './RightContainer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const RestaurantDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('addFoodCategory');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectView = (view) => {
    setActiveView(view);
  };
  const handlePublish = async () => {
    try {
        const response = await axios.post('http://localhost:8080/ManageFoodItem/publish', { restaurantId });
        alert(response.data.message); // Show message from server
    } catch (error) {
        console.error('Error publishing:', error);
        alert(error.response ? error.response.data.error : 'Failed to publish. Please try again.');
    }
};



  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const restaurantId = searchParams.get('restaurantId');

  const [RestaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Restaurant/restaurant/${restaurantId}`);
        setRestaurantData(response.data); 
      } catch (error) {
        console.error("Error fetching manager data:", error);
      }
    };

    fetchRestaurantData(); 
  }, [restaurantId]);

  return (
    <div className={`dashboard ${isSidebarOpen ? 'dashboard-compact' : ''}`}>
      <RestaurantSider 
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
           {RestaurantData ? RestaurantData.restaurantName : ""}
          </span>
          <button 
  className='btn btn-primary publish-button'
  onClick={handlePublish}
>
  Publish
</button>


        </header>
        <RightContainer activeView={activeView} />
      </div>
    </div>
  );
};

export default RestaurantDashboard;
