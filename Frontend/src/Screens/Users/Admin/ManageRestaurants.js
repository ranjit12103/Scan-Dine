import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Users/Admin/Styles/AdminManageRestaurants.css'; // Ensure this path is correct

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch restaurants from the API when the component mounts
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Restaurant/Getallrestaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        toast.error('Error fetching restaurants.');
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/Restaurant/DeleteRestaurant/${id}`);
      // Remove the deleted restaurant from the local state
      setRestaurants(restaurants.filter(restaurant => restaurant._id !== id));
      toast.success('Restaurant deleted successfully!');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      toast.error('Error deleting restaurant.');
    }
  };

  // Filter restaurants based on an exact or partial match to the restaurant name
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.restaurantName || ''; // Updated property name
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h5 className="ManageRestaurants-heading">Manage Restaurants</h5>
      <div className="ManageRestaurants-search-container">
        <div className="ManageRestaurants-search-input-container">
          <span className="material-symbols-outlined ManageRestaurants-search-icon">
            search
          </span>
          <input
            type="text"
            placeholder="Search by restaurant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ManageRestaurants-search-input"
          />
        </div>
      </div>
      <div className="ManageRestaurants-table-container">
        <table className="ManageRestaurants-table">
          <thead>
            <tr>
              <th className="ManageRestaurants-th">Name</th>
              <th className="ManageRestaurants-th">Email</th>
              <th className="ManageRestaurants-th">Contact No</th>
              <th className="ManageRestaurants-th">Address</th>
              <th className="ManageRestaurants-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <tr key={restaurant._id}>
                  <td className="ManageRestaurants-td">{restaurant.restaurantName || 'N/A'}</td>
                  <td className="ManageRestaurants-td">{restaurant.email || 'N/A'}</td>
                  <td className="ManageRestaurants-td">{restaurant.contactNo || 'N/A'}</td>
                  <td className="ManageRestaurants-td">{restaurant.address || 'N/A'}</td>
                  <td className="ManageRestaurants-td">
                    <button
                      className="ManageRestaurants-action-button"
                      onClick={() => handleDelete(restaurant._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="ManageRestaurants-td ManageRestaurants-no-records">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageRestaurants;
