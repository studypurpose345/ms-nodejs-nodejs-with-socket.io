const express = require('express');

const { body } = require('express-validator/check');

const User = require('../models/user');

const router = express.Router();

const authController = require('../controllers/auth');

router.put(
  '/signup',
  [
    body('email')
    .isEmail()
    .withMessage('Please Enter A Valid Email.')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
      .then(userDoc => {
        if(userDoc) {
          return Promise.reject('Email Already Exists');
        }
      });
    })
    .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().notEmpty(),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
