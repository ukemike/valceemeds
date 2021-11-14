const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register').get(users.renderRegister).post(catchAsync(users.register));

router.route('/about').get(users.renderAboutUs)

router.route('/table').get(users.renderTable)

router.route('/faqs').get(users.renderFaqs)

router.route('/contact').get(users.renderContact)

// router.route('/home').get(users.renderHome)

router.route('/main').get(users.renderMain)

router.route('/login').get(users.renderLogin).post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;