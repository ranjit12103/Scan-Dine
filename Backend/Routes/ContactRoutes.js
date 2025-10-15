const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const Contact = require('../Models/ContactSchema'); 

const router = express.Router();

// Joi schema for validation
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().length(10).required(),
  description: Joi.string().required()
});

// POST route to add a new contact
router.post('/AddContact', async (req, res) => {
  // Validate request body
  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Create a new contact
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (err) {
    if (err.code === 11000) { // MongoDB duplicate key error code
      return res.status(400).send('Email already exists. Please use a different email address.');
    }
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// GET route to retrieve all contacts
router.get('/GetAll', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// DELETE route to remove a contact by ID
router.delete('/DeleteContact/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format.');
  }

  try {
    const result = await Contact.findByIdAndDelete(id);
    if (!result) return res.status(404).send('Contact not found.');
    res.status(200).send('Contact deleted successfully.');
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// DELETE route to remove all contacts
router.delete('/DeleteAllContacts', async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.status(200).send('All contacts deleted successfully.');
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

module.exports = router;
