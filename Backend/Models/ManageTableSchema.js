const mongoose = require('mongoose');

const manageTableSchema = new mongoose.Schema({
    restaurantId: {
        type: String, 
        required: true
    },
    numberOfTables: {
        type: Number,
        required: true,
        min: [1, 'At least one table is required']
    }
}, {
    timestamps: true
});

const ManageTable = mongoose.model('ManageTable', manageTableSchema);

module.exports = ManageTable;
