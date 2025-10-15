import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [RestaurantData, setRestaurantData] = useState(null);
  console.log("RestaurantData",RestaurantData)
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const restaurantId = searchParams.get('restaurantId');

  useEffect(() => {
    const fetchDataAndNavigate = async () => {
      try {
        // Check if Restaurant is valid
        if (!restaurantId) {
          throw new Error('Restaurant ID is missing or invalid');
        }

    

        const response = await axios.get(`http://localhost:8080/Restaurant/restaurant/${restaurantId}`);
        setRestaurantData(response.data);

        // Delay for 5 seconds before navigating to ManagerDashboard
        await new Promise(resolve => setTimeout(resolve, 5000));
        navigate(`/RestaurantDashboard?restaurantId=${restaurantId}`);
      } catch (error) {
        console.error('Error:', error.message);
        // Handle error scenarios, e.g., redirect to an error page
        navigate('/ErrorPage');
      }
    };

    // Start animation after 1 second (adjust as needed)
    const delayAnimation = setTimeout(() => {
      setIsVisible(true);
      fetchDataAndNavigate();
    }, 1000); // 1000 milliseconds = 1 second


    return () => {
      clearTimeout(delayAnimation);
      setIsVisible(false);
    };
  }, [navigate, restaurantId]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        backgroundColor:'#35353c',
        color: 'rgb(255, 216, 0)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      {RestaurantData ? (
        <>
          <h3 style={{ marginBottom: '10px', fontSize: '23px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px' }}>
            Welcome {RestaurantData.restaurantName}
          </h3>
          <h5 style={{ marginTop: '10px', fontSize: '20px', fontWeight: '500', lineHeight: '24px' }}>
            Getting ready for you...
          </h5>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SplashScreen;











