// INITIALIZING
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// POST authenticate user /auth/login
router.get('/login', authController.authenticateUser);

// POST create user /auth/create
router.post('/create', authController.createUser);

module.exports = router;