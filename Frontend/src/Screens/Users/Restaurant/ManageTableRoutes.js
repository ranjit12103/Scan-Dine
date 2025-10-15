const express = require('express');
const router = express.Router();
const ManageTable = require('../Models/ManageTableSchema'); 

// Add a new table management entry
router.post('/add', async (req, res) => {
    try {
        const { restaurantId, numberOfTables } = req.body;

        if (!restaurantId || numberOfTables === undefined) {
            return res.status(400).json({ error: 'Restaurant ID and number of tables are required' });
        }

        // Create an array of tables with default availability as true (available)
        const tables = [];
        for (let i = 1; i <= numberOfTables; i++) {
            tables.push({ tableNumber: i, isAvailable: true });
        }

        const manageTable = new ManageTable({ restaurantId, numberOfTables, tables });
        await manageTable.save();

        res.status(201).json({ message: 'Table management entry added successfully', manageTable });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get table management data by restaurant ID
router.get('/getTableData/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(400).json({ error: 'Restaurant ID is required' });
        }

        const manageTable = await ManageTable.findOne({ restaurantId });

        if (!manageTable) {
            return res.status(404).json({ message: 'Table management data not found for this restaurant' });
        }

        res.status(200).json({ manageTable });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Edit a table management entry
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { numberOfTables } = req.body;

        if (!numberOfTables || numberOfTables <= 0) {
            return res.status(400).json({ error: 'Number of tables must be a positive number' });
        }

        const updatedTable = await ManageTable.findByIdAndUpdate(id, { numberOfTables }, { new: true });

        if (!updatedTable) {
            return res.status(404).json({ message: 'Table not found' });
        }

        res.status(200).json({ message: 'Table count updated successfully', updatedTable });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a table management entry
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedManageTable = await ManageTable.findByIdAndDelete(id);

        if (!deletedManageTable) {
            return res.status(404).json({ message: 'Table management entry not found' });
        }

        res.status(200).json({ message: 'Table management entry deleted successfully', deletedManageTable });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete all table management entries for a specific restaurant
router.delete('/deleteAll/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(400).json({ error: 'Restaurant ID is required' });
        }

        const result = await ManageTable.deleteMany({ restaurantId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No table management entries found for this restaurant' });
        }

        res.status(200).json({ message: 'All table management entries deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update availability of a table (mark as available/unavailable)
router.put('/updateAvailability/:restaurantId/:tableNumber', async (req, res) => {
    try {
        const { restaurantId, tableNumber } = req.params;
        const { isAvailable } = req.body;

        // Validate isAvailable value
        if (typeof isAvailable !== 'boolean') {
            return res.status(400).json({ error: 'isAvailable must be a boolean value' });
        }

        const manageTable = await ManageTable.findOne({ restaurantId });

        if (!manageTable) {
            return res.status(404).json({ message: 'Table management data not found for this restaurant' });
        }

        const table = manageTable.tables.find(table => table.tableNumber === parseInt(tableNumber));

        if (!table) {
            return res.status(404).json({ message: `Table number ${tableNumber} not found` });
        }

        table.isAvailable = isAvailable;

        await manageTable.save();

        res.status(200).json({ message: `Table ${tableNumber} availability updated successfully`, manageTable });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
