const express = require('express');
const router = express.Router();

// @route   GET api/v1/auth
// @desc    Get the current loggged in user
// @access  Private

router.get('/', (req, res) => {
  res.send('Logged User');
});

// @route   POST api/v1/auth
// @desc    Auth user & get token
// @access  Public

router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;
