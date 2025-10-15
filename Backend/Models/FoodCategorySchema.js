const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    restaurantId: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);

module.exports = FoodCategory;
