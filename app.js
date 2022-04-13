// INITIALIZING
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// ROUTES
const authRoutes = require('./routes/auth');

// USE
app.use(bodyParser.json());

// HEADERS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

// ROUTES
app.use('/auth', authRoutes);
app.listen(8080);