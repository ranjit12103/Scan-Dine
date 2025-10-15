import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import '../Restaurant/Styles/FoodItemsView.css'; // Ensure this file has the updated styles

const EditFoodItemModal = ({ item, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const [errors, setErrors] = useState({});
  const [foodCategories, setFoodCategories] = useState([]);
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const fetchFoodCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/RestaurantCategory/getFoodCategory/${restaurantId}`);
        setFoodCategories(response.data.foodCategories);
      } catch (error) {
        console.error('Failed to fetch food categories:', error);
      }
    };
  
    fetchFoodCategories();
  }, [restaurantId]);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!editedItem.foodName) errors.foodName = "Food name is required.";
    if (!editedItem.foodType) errors.foodType = "Food type is required.";
    if (!editedItem.foodCategory) errors.foodCategory = "Food category is required.";
    if (!editedItem.price || editedItem.price <= 0) errors.price = "Price must be a positive number.";
    // if (!editedItem.foodImage || !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(editedItem.foodImage)) {
    //   errors.foodImage = "Invalid image URL. Must be a valid image link.";
    // }
    if (!editedItem.description) errors.description = "description category is required.";
    return errors;
  };
  
  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSave(editedItem);
    } else {
      setErrors(validationErrors);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Edit Food Item</h4>
        <div className="modal-form">
        <div className="modal-form-group">
  <label htmlFor="name">Food Name</label>
  <input
    id="name"
    type="text"
    name="foodName"
    placeholder="Food Name"
    value={editedItem.foodName}
    onChange={handleChange}
  />
</div>
{errors.foodName && <div className="error-message-viewfood">{errors.foodName}</div>}

          <div className="modal-form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="foodType"
              value={editedItem.foodType}
              onChange={handleChange}
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
          {errors.foodType && <div className="error-message-viewfood">{errors.foodType}</div>}
          <div className="modal-form-group">
  <label htmlFor="category">Category</label>
  <select
    id="category"
    name="foodCategory"
    value={editedItem.foodCategory}
    onChange={handleChange}
  >
    {foodCategories.map(category => (
      <option key={category._id} value={category.category}>
        {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
      </option>
    ))}
  </select>
</div>

          {errors.foodCategory && <div className="error-message-viewfood">{errors.foodCategory}</div>}
          <div className="modal-form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Price"
              value={editedItem.price}
              onChange={handleChange}
            />
          </div>
          {errors.price && <div className="error-message-viewfood">{errors.price}</div>}
          <div className="modal-form-group">
            <label htmlFor="image">Food Image URL</label>
            <input
              id="image"
              type="text"
              name="foodImage"
              placeholder="Food Image URL"
              value={editedItem.foodImage}
              onChange={handleChange}
            />
          </div>
          {errors.foodImage && <div className="error-message-viewfood">{errors.foodImage}</div>}
          <div className="modal-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Food Description"
              value={editedItem.description || ''}
              onChange={handleChange}
            />
          </div>
          {errors.description && <div className="error-message-viewfood">{errors.description}</div>}
        </div>
        <div className="modal-buttons">
          <button onClick={handleSave} className="modal-edit-button">Save</button>
          <button onClick={onClose} className="modal-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ item, onClose, onConfirm }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Are you sure you want to delete "{item.foodName}"?</h4>
      <div className="modal-buttons">
        <button onClick={onConfirm} className="modal-confirm-button">Yes</button>
        <button onClick={onClose} className="modal-cancel-button">No</button>
      </div>
    </div>
  </div>
);

const ViewFoodItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState('');
  const [itemToEdit, setItemToEdit] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restaurantId = localStorage.getItem("restaurantId");
  const BASE_URL = 'http://localhost:8080/'; // Your server URL

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}ManageFoodItem/get/${restaurantId}`);
        setFoodItems(response.data.foodItems);
      } catch (error) {
        setError('No Food Items Available');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [restaurantId]);

  const getImageUrl = (path) => {
    return path ? `${BASE_URL}${path}` : 'default-image-url'; // Replace 'default-image-url' with a valid fallback URL
  };

  const filteredItems = foodItems.filter(item =>
    item.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setModalVisible('edit');
  };

  const handleDeleteClick = (item) => {
    setItemToEdit(item);
    setModalVisible('delete');
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}ManageFoodItem/delete/${itemToEdit._id}`);
      setFoodItems(prevItems => prevItems.filter(item => item._id !== itemToEdit._id));
      toast.success('Food item deleted successfully!'); // Toastify notification
    } catch (error) {
      toast.error('Failed to delete food item.'); // Toastify notification
    } finally {
      setModalVisible('');
      setItemToEdit(null);
    }
  };

  const handleSaveEdit = async (editedItem) => {
    try {
      await axios.put(`${BASE_URL}ManageFoodItem/edit/${itemToEdit._id}`, editedItem);
      setFoodItems(prevItems => prevItems.map(item =>
        item._id === itemToEdit._id ? editedItem : item
      ));
      toast.success('Food item updated successfully!'); // Toastify notification
    } catch (error) {
      toast.error('Failed to update food item.'); // Toastify notification
    } finally {
      setModalVisible('');
      setItemToEdit(null);
    }
  };

  const handleCloseModal = () => {
    setModalVisible('');
    setItemToEdit(null);
  };

  return (
    <div>
      <h5 className="ViewFoodItems-heading">Food Items</h5>
      <div className="ViewFoodItems-search-container">
        <div className="ViewFoodItems-search-input-container">
          <span className="material-symbols-outlined ViewFoodItems-search-icon">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ViewFoodItems-search-input"
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className='text-center text-dark'>{error}</p>}
      {filteredItems.length === 0 && !loading && !error && (
        <p className='text-dark text-center'>No food items available.</p>
      )}
      <div className="ViewFoodItems-cards-container">
        {filteredItems.map((item) => (
          <div className="ViewFoodItems-card" key={item._id}>
            <div className={`ViewFoodItems-card-type-indicator ${item.foodType}`}>
              {item.foodType}
            </div>
            <img src={getImageUrl(item.foodImage)} alt={item.foodName} className="ViewFoodItems-card-image" />
            <div className="ViewFoodItems-card-price-overlay">
              {item.price} Rs
            </div>
            <div className="ViewFoodItems-card-content">
              <h6 className="ViewFoodItems-card-name">{item.foodName}</h6>
              <p className="ViewFoodItems-card-category">Category: {item.foodCategory}</p>
              <p className="ViewFoodItems-card-description">{item.description}</p>
            </div>
            <span
              className="material-symbols-outlined ViewFoodItems-edit-icon"
              onClick={() => handleEditClick(item)}
            >
              edit
            </span>
            <span
              className="material-symbols-outlined ViewFoodItems-delete-icon"
              onClick={() => handleDeleteClick(item)}
            >
              delete
            </span>
            </div>
        ))}
      </div>
      {modalVisible === 'edit' && (
        <EditFoodItemModal
          item={itemToEdit}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
      {modalVisible === 'delete' && (
        <DeleteConfirmationModal
          item={itemToEdit}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default ViewFoodItems;
