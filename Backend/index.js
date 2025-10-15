require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const path = require('path');

// Database connection
connection();

// Middlewares
app.use(express.json({ limit: '400mb' }));
app.use(express.urlencoded({ limit: '400mb', extended: true }));
app.use(cors());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/qrcodes', express.static(path.join(__dirname, 'qrcodes')));


// Routes
const AdminAuth = require('./Routes/AdminRoutes');
const ContactRoutes = require('./Routes/ContactRoutes');
const RestaurantAuth = require('./Routes/RestaurantRoutes');
const FoodCategory = require('./Routes/FoodCategoryRoutes');
const ManageTable = require('./Routes/ManageTableRoutes');
const ManageFoodItem = require('./Routes/ManageFoodItem');
const customerRoutes = require("./Routes/customers");





app.use('/Admin', AdminAuth);
app.use('/Contact', ContactRoutes);
app.use('/Restaurant', RestaurantAuth);
app.use('/RestaurantCategory', FoodCategory);
app.use('/ManageTable', ManageTable);
app.use('/ManageFoodItem', ManageFoodItem);
app.use('/customerRoutes', customerRoutes);

// // Start server
// const port = process.env.PORT || 8080;
// app.listen(port, console.log(`Listening on port ${port}...`));


// Define the port
const port = process.env.PORT || 8080;

// Start server and listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
