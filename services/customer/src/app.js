const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./router/routes');

const app = express();

// Middleware Definitions
const errorMiddleware = (error, req, res, next) => {
    res.status(error.status || 500).json({
        status: 'error',
        message: error.message || 'Internal Server Error',
        data: error,
    });
};

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging middleware

// Routes
app.use('/', routes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;