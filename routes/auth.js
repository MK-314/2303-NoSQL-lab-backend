// INITIALIZING
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');

// POST authenticate user /auth/login
router.post('/login', [
        body('username').trim().isLength({ min: 3 }).escape(),
        body('password').trim().isLength({ min: 3 }).escape(),
    ],
    authController.authenticateUser);

// POST create user /auth/create
router.post('/create', [
        body('username').trim().isLength({ min: 3 }).escape(),
        body('password').trim().isLength({ min: 3 }).escape(),
    ],
    authController.createUser);

module.exports = router;