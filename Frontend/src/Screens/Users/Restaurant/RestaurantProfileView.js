import React, { useEffect, useState } from 'react';
import './Styles/RestaurantProfileView.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestaurantProfileView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [RestaurantData, setRestaurantData] = useState(null);
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Restaurant/restaurant/${restaurantId}`);
        setRestaurantData(response.data);
        setFormData({
          name: response.data.restaurantName,
          email: response.data.email,
          contactNo: response.data.contactNo,
          address: response.data.address
        });
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  const handleOpenModal = () => {
    // Clear errors when opening the modal
    setErrors({});
    setIsModalOpen(true);
    // Ensure form data is updated to the latest values
    if (RestaurantData) {
      setFormData({
        name: RestaurantData.restaurantName,
        email: RestaurantData.email,
        contactNo: RestaurantData.contactNo,
        address: RestaurantData.address
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally clear form data if needed (optional)
    // setFormData({
    //   name: '',
    //   email: '',
    //   contactNo: '',
    //   address: ''
    // });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Restaurant Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.contactNo) newErrors.contactNo = 'Contact No is required';
    if (!formData.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Create an object with only the updated fields
      const updatedData = {};
      if (formData.name !== RestaurantData.restaurantName) updatedData.restaurantName = formData.name;
      if (formData.email !== RestaurantData.email) updatedData.email = formData.email;
      if (formData.contactNo !== RestaurantData.contactNo) updatedData.contactNo = formData.contactNo;
      if (formData.address !== RestaurantData.address) updatedData.address = formData.address;

      if (Object.keys(updatedData).length > 0) {
        await axios.put(`http://localhost:8080/Restaurant/editrestaurant/${restaurantId}`, updatedData);
        toast.success('Restaurant details updated successfully!');
        handleCloseModal();
        const response = await axios.get(`http://localhost:8080/Restaurant/restaurant/${restaurantId}`);
        setRestaurantData(response.data);
      } else {
        toast.info('No changes detected.');
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating restaurant data:", error);
      toast.error('Error updating restaurant details.');
    }
  };

  return (
    <div className="restaurant-profile-container">
      <ToastContainer />

      <div className="row">
        <div className="col-lg-8">
          <h5 className="restaurant-profile-title">Restaurant Profile</h5>
        </div>
      </div>
      <div className="restaurant-profile-card-container">
        <div className="restaurant-profile-card">
          <div className="restaurant-profile-header">
            <span className="material-symbols-outlined restaurant-profile-icon">
              storefront
            </span>
            <h5 className="restaurant-profile-card-title">{RestaurantData ? RestaurantData.restaurantName : ""}</h5>
            <button className="restaurant-profile-edit-button" onClick={handleOpenModal}>Edit</button>
          </div>
          <p className="restaurant-profile-card-text"><strong>Email:</strong> {RestaurantData ? RestaurantData.email : ""}</p>
          <p className="restaurant-profile-card-text"><strong>Contact No:</strong> {RestaurantData ? RestaurantData.contactNo : ""}</p>
          <p className="restaurant-profile-card-text"><strong>Address:</strong> {RestaurantData ? RestaurantData.address : ""}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="restaurant-profile-modal-overlay">
          <div className="restaurant-profile-modal-content">
            <h4>Edit Restaurant Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="restaurant-profile-form-group">
                <label htmlFor="name">Restaurant Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <span className="Restaurant-form-error">{errors.name}</span>}
              <div className="restaurant-profile-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                
              </div>
              {errors.email && <span className="Restaurant-form-error">{errors.email}</span>}
              <div className="restaurant-profile-form-group">
                <label htmlFor="contactNo">Contact No</label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                />
               
              </div>
              {errors.contactNo && <span className="Restaurant-form-error">{errors.contactNo}</span>}
              <div className="restaurant-profile-form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
           
              </div>
              {errors.address && <span className="Restaurant-form-error">{errors.address}</span>}
              <div className="restaurant-profile-modal-buttons">
                <button type="submit" className="restaurant-profile-save-button">Save Changes</button>
                <button type="button" className="restaurant-profile-cancel-button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfileView;
