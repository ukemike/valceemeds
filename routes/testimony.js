const express = require('express');
const router = express.Router();
const testimonys = require('../controllers/testimony');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateTestimony } = require('../middleware');

const Testimony = require('../models/testimony');

router.route('/').get(catchAsync(isLoggedIn, testimonys.index));

router.route('/').post(isLoggedIn, validateTestimony, catchAsync(testimonys.createTestimony));

router.get('/new', isLoggedIn, testimonys.renderNewForm);

router.route('/:id').get(catchAsync(testimonys.showTestimony)).put(isLoggedIn, isAuthor, validateTestimony, catchAsync(testimonys.updateTestimony)).delete(isLoggedIn, isAuthor, catchAsync(testimonys.deleteTestimony));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(testimonys.renderEditForm))



module.exports = router;