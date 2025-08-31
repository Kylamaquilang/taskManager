const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tasksRoutes = require('./routes/tasks.route');

const app = express();

// Middlewarers

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', tasksRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Task Manager API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

module.exports = app;