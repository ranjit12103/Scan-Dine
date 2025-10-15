const express = require('express');
const multer = require('multer');
const path = require('path');
const QRCode = require('qrcode');
const FoodItem = require('../models/foodItemSchema');
const fs = require('fs');
const router = express.Router();

// Set up multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Generate QR code and save path to database


const generateQRCode = async (restaurantId) => {
    const url = `http://192.168.254.7:8080/ManageFoodItem/get/${restaurantId}`;
    const qrPath = path.join(__dirname, '../qrcodes', `${restaurantId}.png`);

    try {
        await QRCode.toFile(qrPath, url);
        return qrPath;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};


// Example route to handle publishing
router.post('/publish', async (req, res) => {
    try {
        const { restaurantId } = req.body;

        if (!restaurantId) {
            return res.status(400).json({ error: 'Restaurant ID is required' });
        }

        // Generate QR code and update database as needed
        const qrPath = await generateQRCode(restaurantId);

        // Optionally update QR path in database
        await FoodItem.updateMany({ restaurantId }, { qrCodePath: qrPath });

        res.status(200).json({ message: 'Publish successful', qrPath });
    } catch (error) {
        console.error('Error publishing:', error);
        res.status(500).json({ error: 'Failed to publish' });
    }
});


// Route to get QR code for a given restaurant ID
router.get('/qrCode/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;
        if (!restaurantId) {
            return res.status(400).json({ error: 'Restaurant ID is required' });
        }

        // Generate the QR code
        const qrPath = path.join(__dirname, '../qrcodes', `${restaurantId}.png`);

        // Check if the QR code file exists
        if (!fs.existsSync(qrPath)) {
            return res.status(404).json({ error: 'QR code not found' });
        }

        // Serve the QR code image
        res.sendFile(qrPath);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});



// Route to add food item
router.post('/add', upload.single('foodImage'), async (req, res) => {
    try {
        const { restaurantId, foodName, foodType, foodCategory, price, description } = req.body;
        const foodImage = req.file ? req.file.path : '';

        if (!restaurantId || !foodName || !foodType || !foodCategory || !price || !description) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const newFoodItem = new FoodItem({
            restaurantId,
            foodName,
            foodType,
            foodCategory,
            price,
            description,
            foodImage
        });

        await newFoodItem.save();

        // Generate or update QR code
        const qrPath = await generateQRCode(restaurantId);

        res.status(201).json({ message: 'Food item added successfully!', foodItem: newFoodItem, qrPath });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/foodItems/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(400).json({ error: 'Restaurant ID is required' });
        }

        const foodItems = await FoodItem.find({ restaurantId });

        if (!foodItems.length) {
            return res.status(404).json({ message: 'No food items found for this restaurant' });
        }

        res.status(200).json({ foodItems });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Get all food items by restaurant ID
router.get('/get/:restaurantId', async (req, res) => {
    console.log('Received request for:', req.params.restaurantId);
    try {
        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(400).json({ error: 'Restaurant ID is required' });
        }

        const foodItems = await FoodItem.find({ restaurantId });

        if (!foodItems.length) {
            return res.status(404).json({ message: 'No food items found for this restaurant' });
        }

        res.status(200).json({ foodItems });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a single food item by ID
router.get('/getById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Food item ID is required' });
        }

        const foodItem = await FoodItem.findById(id);

        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json({ foodItem });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Edit a food item
router.put('/edit/:id', upload.single('foodImage'), async (req, res) => {
    try {
        const { id } = req.params;
        const { foodName, foodType, foodCategory, price, description } = req.body;
        const foodImage = req.file ? req.file.path : null;

        if (!id) {
            return res.status(400).json({ error: 'Food item ID is required' });
        }

        if (foodName === undefined || foodType === undefined || foodCategory === undefined || price === undefined || price === null) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (price < 0) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }

        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, {
            foodName,
            foodType,
            foodCategory,
            price,
            foodImage,
            description
        }, { new: true });

        if (!updatedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        // Generate or update QR code
        const qrPath = await generateQRCode(updatedFoodItem.restaurantId);

        res.status(200).json({ message: 'Food item updated successfully', updatedFoodItem, qrPath });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a food item
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Food item ID is required' });
        }

        const deletedFoodItem = await FoodItem.findByIdAndDelete(id);

        if (!deletedFoodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        // Optionally, regenerate the QR code to reflect the current state of food items
        const qrPath = await generateQRCode(deletedFoodItem.restaurantId);

        res.status(200).json({ message: 'Food item deleted successfully', deletedFoodItem, qrPath });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
