import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Admin/Styles/AdminCreateRestaurantAccount.css'; 

const CreateRestaurantAccount = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!restaurantName.trim()) {
            newErrors.restaurantName = 'Restaurant name is required!';
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required!';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid!';
        }
        if (!address.trim()) {
            newErrors.address = 'Address is required!';
        }
        if (!contactNumber.trim()) {
            newErrors.contactNumber = 'Contact number is required!';
        } else if (!/^\d{10}$/.test(contactNumber)) {
            newErrors.contactNumber = 'Contact number should be 10 digits!';
        }
        if (!password) {
            newErrors.password = 'Password is required!';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long!';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/Restaurant/signup', {
                restaurantName,
                email,
                password, 
                contactNo: contactNumber,
                address
            });

            toast.success('Restaurant account created successfully!');
            
            setRestaurantName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAddress('');
            setContactNumber('');
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data) {
                const serverErrors = error.response.data.message || 'Failed to create restaurant account. Please try again.';
                setErrors({ server: serverErrors });
                toast.error(serverErrors);
            } else {
                toast.error('Failed to create restaurant account. Please try again.');
            }
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className="admin-create-restaurant-account-container">
            <h5 className="admin-create-restaurant-account-title">Create Restaurant Account</h5>
            <form onSubmit={handleSubmit} className="admin-create-restaurant-account-form">
                <div className="admin-create-restaurant-account-form-group">
                    <label htmlFor="restaurantName">Restaurant Name</label>
                    <input
                        type="text"
                        id="restaurantName"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="admin-create-restaurant-account-form-control"
                        placeholder="Enter the restaurant name"
                    />
                    {errors.restaurantName && <div className="admin-create-restaurant-account-error">{errors.restaurantName}</div>}
                </div>
                <div className="admin-create-restaurant-account-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="admin-create-restaurant-account-form-control"
                        placeholder="Enter your email"
                    />
                    {errors.email && <div className="admin-create-restaurant-account-error">{errors.email}</div>}
                </div>
                <div className="admin-create-restaurant-account-form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="admin-create-restaurant-account-form-control"
                        placeholder="Enter the restaurant address"
                    />
                    {errors.address && <div className="admin-create-restaurant-account-error">{errors.address}</div>}
                </div>
                <div className="admin-create-restaurant-account-form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="admin-create-restaurant-account-form-control"
                        placeholder="Enter the contact number"
                    />
                    {errors.contactNumber && <div className="admin-create-restaurant-account-error">{errors.contactNumber}</div>}
                </div>
                <div className="admin-create-restaurant-account-form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="admin-create-restaurant-account-form-control"
                        placeholder="Enter your password"
                    />
                    {errors.password && <div className="admin-create-restaurant-account-error">{errors.password}</div>}
                </div>
                <div className="admin-create-restaurant-account-form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="admin-create-restaurant-account-form-control"
                        placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword && <div className="admin-create-restaurant-account-error">{errors.confirmPassword}</div>}
                </div>
                <button type="submit" className="admin-create-restaurant-account-btn-primary">Create Account</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateRestaurantAccount;
