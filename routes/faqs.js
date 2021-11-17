const express = require('express');
const router = express.Router();
const faqs = require('../controllers/faqs');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateFaqs } = require('../middleware');

const Faqs = require('../models/faqs');

router.route('/list').get((isLoggedIn, faqs.index));

router.route('/').get((faqs.indexs));

router.route('/').post(isLoggedIn, validateFaqs, catchAsync(faqs.createFaqs));

router.get('/list', isLoggedIn, faqs.renderList);

router.get('/new', isLoggedIn, faqs.renderNewForm);

router.route('/:id').get(catchAsync(faqs.showFaq)).put(isLoggedIn, validateFaqs, catchAsync(faqs.updateFaq)).delete(isLoggedIn, catchAsync(faqs.deleteFaq));

router.get('/:id/edit', isLoggedIn, catchAsync(faqs.renderEditForm))



module.exports = router;