const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    restaurantId: {
        type: String, 
        required: true
    },
    foodName: {
        type: String,
        required: true,
        trim: true
    },
    foodType: {
        type: String,
        required: true,
        enum: ['veg', 'non-veg'], // Restricting to only 'veg' or 'non-veg'
    },
    foodCategory: {
        type: String, // Changed from ObjectId to String
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive'] // Ensures price is non-negative
    },
    foodImage: {
        type: String, // Assuming a URL or path to the image
        trim: true
    },
    qrCodePath: {
        type: String, // Assuming a URL or path to the QR code image
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
