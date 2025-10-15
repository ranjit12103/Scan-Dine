const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { jwtkey } = require('../keys');
const Restaurant = require('../Models/RestaurantSchema');

// Validation schema for signup using Joi
const signupSchema = Joi.object({
  restaurantName: Joi.string().required().label('Restaurant Name'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().min(6).label('Password'),
  contactNo: Joi.string().required().label('Contact Number'),
  address: Joi.string().required().label('Address')
});

// Route: POST /signup
router.post('/signup', async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { restaurantName, email, password, contactNo, address } = req.body;

    // Check if restaurant already exists
    let restaurant = await Restaurant.findOne({ email });
    if (restaurant) {
      return res.status(400).send({ message: 'Restaurant already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new restaurant
    restaurant = new Restaurant({
      restaurantName,
      email,
      password: hashedPassword,
      contactNo,
      address
    });

    // Save the restaurant to the database
    await restaurant.save();

    // Generate JWT token
    const token = jwt.sign({ restaurantId: restaurant._id }, jwtkey);

    // Return token and restaurant ID
    res.status(201).send({ token, restaurantId: restaurant._id, message: 'Restaurant registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Validation schema for login using Joi
const loginSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
});

// Route: POST /login
router.post('/login', async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if restaurant exists
    let restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Restaurant authenticated, generate JWT token
    const token = jwt.sign({ restaurantId: restaurant._id }, jwtkey);

    // Return the token and any additional data you may need
    res.status(200).send({ token, restaurantId: restaurant._id, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route: GET /restaurants
router.get('/Getallrestaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().select('-password');

    // Return the array of restaurants
    res.status(200).send(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route: GET /restaurant/:restaurantId
router.get('/restaurant/:restaurantId', async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    const restaurant = await Restaurant.findById(restaurantId).select('-password');

    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    // Return restaurant details
    res.status(200).send(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Validation schema for updating restaurant details using Joi
const updateSchema = Joi.object({
  restaurantName: Joi.string().optional().label('Restaurant Name'),
  email: Joi.string().email().optional().label('Email'),
  contactNo: Joi.string().optional().label('Contact Number'),
  address: Joi.string().optional().label('Address')
});

// Route: PUT /restaurant/:restaurantId
router.put('/editrestaurant/:restaurantId', async (req, res) => {
  const restaurantId = req.params.restaurantId;
  
  try {
    // Validate request body using Joi
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { restaurantName, email, contactNo, address } = req.body;

    // Find the restaurant by ID
    let restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    // Update fields if provided
    if (restaurantName) restaurant.restaurantName = restaurantName;
    if (email) restaurant.email = email;
    if (contactNo) restaurant.contactNo = contactNo;
    if (address) restaurant.address = address;

    // Save the updated restaurant details
    await restaurant.save();

    // Return success response
    res.status(200).send({ message: 'Restaurant updated successfully', restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


// Route: DELETE /restaurant/:restaurantId
router.delete('/DeleteRestaurant/:restaurantId', async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    // Find and delete the restaurant by ID
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    // Return success response
    res.status(200).send({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
