const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/v1/contacts
// @desc    Get all contacts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(200).json(error);
  }
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

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('type', 'Type must be personal or professional').isIn([
        'personal',
        'professional',
      ]),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);
// @route   PUT api/v1/contacts/:id
// @desc    Update a contact based on the id
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    //Make sure user owns contact

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json(error);
  }
});

// @route   DELETE api/v1/contacts/:id
// @desc    Delete a contact based on the id
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    //Make sure user owns contact

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not Authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.status(200).json({ message: 'Contact Removed' });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
