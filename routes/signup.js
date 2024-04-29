// routes/signup.js
const express = require('express');
const router = express.Router();
// const cors = require('cors'); // Import the cors middleware
// const User = require('../models/user');
// const bcrypt = require('bcrypt');

router.post('/api/signup', async (req, res) => {
    console.log('req :>> ', req.body);
    
});

module.exports = router;