const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contact');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware');

const Contacts = require('../models/contact');

router.route('/list').get((isLoggedIn, contacts.index));

// router.route('/').get((contacts.indexs));

router.route('/').get((contacts.indexexe));

router.route('/').post(isLoggedIn, catchAsync(contacts.createContacts));

router.get('/list', isLoggedIn, contacts.renderList);

router.get('/new', isLoggedIn, contacts.renderNewForm);

router.route('/:id').put(isLoggedIn, catchAsync(contacts.updateContact)).delete(isLoggedIn, catchAsync(contacts.deleteContact));

router.get('/:id/edit', isLoggedIn, catchAsync(contacts.renderEditForm))



module.exports = router;