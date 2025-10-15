import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './Styles/RestaurantAddFoodCategory.css'; 

const RestaurantAddFoodCategory = () => {
    const [foodCategory, setFoodCategory] = useState('');
    const [error, setError] = useState(''); 
    const restaurantId = localStorage.getItem("restaurantId");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!foodCategory.trim()) {
            toast.error('Food category cannot be empty!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/RestaurantCategory/add', {
                restaurantId: restaurantId, 
                category: foodCategory
            });

            // Assuming the server responds with a success message
            toast.success(response.data.message || 'Food category added successfully!');
            setFoodCategory('');
        } catch (error) {
            // Handle errors with toast notifications
            if (error.response) {
                toast.error(error.response.data.error || 'Failed to add food category');
            } else {
                toast.error('Server error');
            }
        }
    };

    return (
        <div className="restaurant-add-food-category-container">
            <h5 className="restaurant-add-food-category-title">Add Food Category</h5>
            <form onSubmit={handleSubmit} className="restaurant-add-food-category-form">
                <div className="restaurant-add-food-category-form-group">
                    <label htmlFor="foodCategory">Food Category</label>
                    <input
                        type="text"
                        id="foodCategory"
                        value={foodCategory}
                        onChange={(e) => setFoodCategory(e.target.value)}
                        className="restaurant-add-food-category-form-control"
                        placeholder="Enter food category"
                        required
                    />
                </div>
                <button type="submit" className="restaurant-add-food-category-btn-primary">Add Category</button>
            </form>
            <ToastContainer /> {/* Add ToastContainer to render toasts */}
        </div>
    );
};

export default RestaurantAddFoodCategory;
