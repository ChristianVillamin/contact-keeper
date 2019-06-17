const express = require('express');
const router = express.Router();

// @route     GET api/users
// @desc      Get logged in user
// @access    Private
router.get('/', (request, response) => {
  response.send('Get logged in user');
});

// @route     POST api/users
// @desc      Auth user & get token
// @access    Public
router.post('/', (request, response) => {
  response.send('Log in user');
});

module.exports = router;
