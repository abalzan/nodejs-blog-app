const express = require('express');
const {body} = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
            return User.findOne({email: value}).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email address already exists');
                }
            })
        }).normalizeEmail(),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long')
], authController.signup);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch('/status', isAuth, [
    body('status').isLength({min: 3}).withMessage('Status must be at least 3 characters long')
], authController.updateUserStatus);

module.exports = router;