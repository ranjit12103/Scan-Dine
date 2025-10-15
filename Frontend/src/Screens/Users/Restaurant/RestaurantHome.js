import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Users/Admin/Styles/AdminHome.css";

const RestaurantHome = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [messageCount, setMessageCount] = useState("Under Development");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCustomerAndMessageCount = async () => {
  //     try {
  //       // Fetch the customer count
  //       const customerResponse = await axios.get("http://localhost:8080/Restaurant/customers");
  //       setCustomerCount(customerResponse.data.length);

  //       // Fetch the message count
  //       const messageResponse = await axios.get("http://localhost:8080/Restaurant/messages");
  //       setMessageCount(messageResponse.data.length);

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch data", error);
  //       setError("Failed to fetch data");
  //       setLoading(false);
  //     }
  //   };

  //   fetchCustomerAndMessageCount();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="restaurant-home-container">
      <div className="row">
        <div className="col-lg-8">
          <h5 className="home-title">
            Home
          </h5>
        </div>
      </div>
      <div className="row card-container">
        {/* Total Customers Card */}
        <div className="col-lg-4">
          <div className="card">
          <div className="card-content">
              <div className="card-icon restaurant-icon">
               

                <span class="material-symbols-outlined">
groups
</span>
              </div>
              <div className="card-info">
                <h5 className="card-title">
                  Customers
                </h5>
                <p className="card-text restaurant-count">
                  {customerCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Messages Card */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-content">
              <div className="card-icon messages-icon">
                <span className="material-symbols-outlined">
                  mail
                </span>
              </div>
              <div className="card-info">
                <h5 className="card-title">
                  Messages
                </h5>
                <p className="card-text message-count">
                  {messageCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHome;
