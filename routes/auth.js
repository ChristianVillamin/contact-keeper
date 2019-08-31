const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route     GET api/users
// @desc      Get logged in user
// @access    Private
router.get('/', (request, response) => {
  response.send('Get logged in user');
});

// @route     POST api/users
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please includ a valid password.').exists()
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: 'Invalid E-mail' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.status(400).json({ message: 'Invalid Password' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (error, token) => {
          if (error) throw error;
          response.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      response.status(500).send('Server Error');
    }
  }
);

module.exports = router;
