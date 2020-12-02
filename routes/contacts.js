const express = require('express');
const router = express.Router();

// @route   GET api/v1/contacts
// @desc    Get all contacts
// @access  Private

router.get('/', (req, res) => {
  res.send('All Contacts');
});

// @route   GET api/v1/contacts/:id
// @desc    Get a single contact by the id
// @access  Private

router.get('/:id', (req, res) => {
  res.send('Single Contact');
});

// @route   POST api/v1/contacts
// @desc    Create a new contact
// @access  Private

router.post('/', (req, res) => {
  res.send('Upload Contact');
});

// @route   PUT api/v1/contacts/:id
// @desc    Update a contact based on the id
// @access  Private

router.put('/:id', (req, res) => {
  res.send('Update Contact');
});

// @route   DELETE api/v1/contacts/:id
// @desc    Delete a contact based on the id
// @access  Private

router.post('/', (req, res) => {
  res.send('Delete Contact');
});

module.exports = router;
