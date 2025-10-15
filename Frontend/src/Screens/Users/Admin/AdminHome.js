import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Users/Admin/Styles/AdminHome.css";

const AdminHome = () => {
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantAndMessageCount = async () => {
      try {
        // Fetch the restaurant data
        const restaurantResponse = await axios.get("http://localhost:8080/Restaurant/Getallrestaurants");
        setRestaurantCount(restaurantResponse.data.length);

        // Fetch the message data
        const messageResponse = await axios.get("http://localhost:8080/Contact/GetAll");
        setMessageCount(messageResponse.data.length);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchRestaurantAndMessageCount();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-home-container">
      <div className="row">
        <div className="col-lg-8">
          <h5 className="home-title">Home</h5>
        </div>
      </div>
      <div className="row card-container">
        {/* Total Restaurant Card */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-content">
              <div className="card-icon restaurant-icon">
                <span className="material-symbols-outlined">storefront</span>
              </div>
              <div className="card-info">
                <h5 className="card-title">Restaurants</h5>
                <p className="card-text restaurant-count">{restaurantCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Messages Card */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-content">
              <div className="card-icon messages-icon">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="card-info">
                <h5 className="card-title">Messages</h5>
                <p className="card-text message-count">{messageCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
