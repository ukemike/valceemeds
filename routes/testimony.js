const express = require('express');
const router = express.Router();
const testimonys = require('../controllers/testimony');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateTestimony } = require('../middleware');

const Testimony = require('../models/testimony');

router.route('/').get((isLoggedIn, testimonys.index));

router.route('/').post(isLoggedIn, validateTestimony, catchAsync(testimonys.createTestimony));

router.get('/new', isLoggedIn, testimonys.renderNewForm);

router.route('/:id').get(catchAsync(testimonys.showTestimony)).put(isLoggedIn, validateTestimony, catchAsync(testimonys.updateTestimony)).delete(isLoggedIn, catchAsync(testimonys.deleteTestimony));

router.get('/:id/edit', isLoggedIn, catchAsync(testimonys.renderEditForm))



module.exports = router;