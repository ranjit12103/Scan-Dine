import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Styles/AddFoodItems.css'; 

const AddFoodItems = () => {
    const [foodName, setFoodName] = useState('');
    const [category, setCategory] = useState('');
    const [foodType, setFoodType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // State for the uploaded image
    const [error, setError] = useState({
        foodName: '',
        category: '',
        foodType: '',
        price: '',
        description: '',
        image: '' // Add image error state
    });
    const [categories, setCategories] = useState([]); // State for categories
    const [selectedCategoryName, setSelectedCategoryName] = useState(''); // State for selected category name
    const restaurantId = localStorage.getItem("restaurantId");

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/RestaurantCategory/getFoodCategory/${restaurantId}`);
                setCategories(response.data.foodCategories); // Use the correct key
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to load categories.');
            }
        };

        fetchCategories();
    }, [restaurantId]);

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!foodName) {
            errors.foodName = 'Food name is required!';
            isValid = false;
        }
        if (!foodType) {
            errors.foodType = 'Food type is required!';
            isValid = false;
        }
        if (!category) {
            errors.category = 'Category is required!';
            isValid = false;
        }
        if (!price) {
            errors.price = 'Price is required!';
            isValid = false;
        }
        if (!description) {
            errors.description = 'Description is required!';
            isValid = false;
        }
        if (!image) {
            errors.image = 'Image is required!';
            isValid = false;
        } else if (image.size > 2 * 1024 * 1024) { // Example: Check if image size exceeds 2MB
            errors.image = 'Image size must be less than 2MB!';
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate the form
        if (!validateForm()) {
            return;
        }
    
        const formData = new FormData();
        formData.append('restaurantId', restaurantId);
        formData.append('foodName', foodName);
        formData.append('foodType', foodType);
        formData.append('foodCategory', selectedCategoryName); // Use the category name
        formData.append('price', price);
        formData.append('description', description);
        if (image) {
            formData.append('foodImage', image);
        }
    
        try {
            await axios.post('http://localhost:8080/ManageFoodItem/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            toast.success('Food item added successfully!');
            setError({
                foodName: '',
                category: '',
                foodType: '',
                price: '',
                description: '',
                image: '' // Clear image error state
            });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error('Failed to add food item. Please try again.');
        }
    
        // Reset form fields
        setFoodName('');
        setCategory('');
        setFoodType('');
        setPrice('');
        setDescription('');
        setImage(null); // Reset image field
        setSelectedCategoryName(''); // Reset selected category name
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(cat => cat._id === selectedCategoryId);
        setCategory(selectedCategoryId);
        setSelectedCategoryName(selectedCategory?.category || '');
    };

    return (
        <div className="add-food-items-container">
            <h5 className="add-food-items-title">Add Food Item</h5>
            <form onSubmit={handleSubmit} className="add-food-items-form">
                <div className="add-food-items-form-row">
                    <div className="add-food-items-form-group">
                        <label htmlFor="foodName">Food Name</label>
                        <input
                            type="text"
                            id="foodName"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            className="add-food-items-form-control"
                            placeholder="Enter food name"
                        />
                        {error.foodName && <div className="text-danger">{error.foodName}</div>}
                    </div>
                    <div className="add-food-items-form-group">
                        <label htmlFor="foodType">Food Type</label>
                        <select
                            id="foodType"
                            value={foodType}
                            onChange={(e) => setFoodType(e.target.value)}
                            className="add-food-items-form-control"
                        >
                            <option value="">Select food type</option>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                        </select>
                        {error.foodType && <div className="text-danger">{error.foodType}</div>}
                    </div>
                    <div className="add-food-items-form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="add-food-items-form-control"
                        >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.category}</option>
                            ))}
                        </select>
                        {error.category && <div className="text-danger">{error.category}</div>}
                    </div>
                </div>
                <div className="add-food-items-form-row">
                    <div className="add-food-items-form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="add-food-items-form-control"
                            placeholder="Enter price"
                        />
                        {error.price && <div className="text-danger">{error.price}</div>}
                    </div>
                    <div className="add-food-items-form-group">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            className="add-food-items-form-control"
                            accept="image/*"
                        />
                        {error.image && <div className="text-danger">{error.image}</div>}
                    </div>
                </div>
                <div className="add-food-items-form-row">
                    <div className="add-food-items-form-group full-width">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="add-food-items-form-control"
                            placeholder="Enter food description"
                            rows="4"
                        />
                        {error.description && <div className="text-danger">{error.description}</div>}
                    </div>
                </div>
                <div className="add-food-items-form-row">
                    <button type="submit" className="add-food-items-btn-primary">Add Food Item</button>
                </div>
            </form>
            <ToastContainer /> {/* Toast container for displaying messages */}
        </div>
    );
};

export default AddFoodItems;
