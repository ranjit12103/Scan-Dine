const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Restaurant" }, // Link to restaurant
  totalSpent: { type: Number, default: 0 },
  visits: { type: Number, default: 1 },
  lastVisit: { type: Date, default: Date.now },
  visitHistory: { type: [Date], default: [] }, // Store visit dates
});

module.exports = mongoose.model("Customerdata", CustomerSchema);
