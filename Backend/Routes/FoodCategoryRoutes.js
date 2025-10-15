const express = require('express');
const router = express.Router();
const FoodCategory = require('../Models/FoodCategorySchema');

// Add a new food category
router.post('/add', async (req, res) => {
    try {
        const { restaurantId, category } = req.body;

        if (!restaurantId || !category) {
            return res.status(400).json({ error: 'Restaurant ID and category are required' });
        }

        const foodCategory = new FoodCategory({ restaurantId, category });
        await foodCategory.save();

        res.status(201).json({ message: 'Food category added successfully', foodCategory });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get food categories by restaurant ID
router.get('/getFoodCategory/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(400).json({ error: 'Restaurant ID is required' });
        }

        const foodCategories = await FoodCategory.find({ restaurantId });

        if (!foodCategories.length) {
            return res.status(404).json({ message: 'No food categories found for this restaurant' });
        }

        res.status(200).json({ foodCategories });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Edit a food category
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }

        const updatedFoodCategory = await FoodCategory.findByIdAndUpdate(id, { category }, { new: true });

        if (!updatedFoodCategory) {
            return res.status(404).json({ message: 'Food category not found' });
        }

        res.status(200).json({ message: 'Food category updated successfully', updatedFoodCategory });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a food category
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFoodCategory = await FoodCategory.findByIdAndDelete(id);

        if (!deletedFoodCategory) {
            return res.status(404).json({ message: 'Food category not found' });
        }

        res.status(200).json({ message: 'Food category deleted successfully', deletedFoodCategory });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
