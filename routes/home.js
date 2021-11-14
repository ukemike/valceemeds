const express = require('express');
const router = express.Router();
const testimonys = require('../controllers/home');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateTestimony } = require('../middleware');

const Testimony = require('../models/testimony');

router.route('/').get(catchAsync(testimonys.index));


module.exports = router;