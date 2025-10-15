const express = require("express");
const Customer = require("../Models/Customer");

const router = express.Router();

// ✅ POST API: Add/Update Customer (Now includes restaurantId)
router.post("/add", async (req, res) => {
  const { name, mobile, amountSpent, restaurantId } = req.body;

  if (!name || !mobile || !amountSpent || !restaurantId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let customer = await Customer.findOne({ mobile });
    let discountApplied = 0;
    let finalAmount = amountSpent;
    let currentDate = new Date();

    if (customer) {
      // Apply discount on every 3rd visit (3rd, 6th, 9th, etc.)
      if ((customer.visits + 1) % 3 === 0) {
        discountApplied = amountSpent * 0.1; // 10% discount
        finalAmount -= discountApplied;
      }

      customer.visits += 1;
      customer.totalSpent += amountSpent;
      customer.lastVisit = currentDate;
      customer.visitHistory.push(currentDate); // Save visit date

    } else {
      // First-time customer
      customer = new Customer({
        name,
        mobile,
        restaurantId,
        totalSpent: amountSpent,
        visits: 1,
        lastVisit: currentDate,
        visitHistory: [currentDate], // Store first visit
      });
    }

    await customer.save();

    res.status(200).json({
      message: "Customer record updated",
      customer,
      discountApplied: discountApplied > 0 ? `₹${discountApplied} discount applied on this visit` : "No discount applied",
      originalSpent: amountSpent,
      currentSpent: finalAmount,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ GET API: Fetch All Customers by Restaurant ID
router.get("/getAll/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const customers = await Customer.find({ restaurantId });

    // Calculate total spent for all customers in this restaurant
    const totalSpent = customers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0);

    res.status(200).json({ customers, totalSpent });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ GET API: Fetch Customer Details by Mobile & Restaurant ID
router.get("/:restaurantId/:mobile", async (req, res) => {
  const { restaurantId, mobile } = req.params;

  try {
    const customer = await Customer.findOne({ restaurantId, mobile });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      name: customer.name,
      mobile: customer.mobile,
      visits: customer.visits,
      totalSpent: customer.totalSpent,
      visitDates: customer.visitHistory, // Returns all visit dates
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
