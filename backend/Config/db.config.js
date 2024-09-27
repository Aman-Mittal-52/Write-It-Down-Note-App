// Package
const mongoose = require('mongoose');

// Environment variables
const CONFIG_URI = process.env.CONFIG_URI;

// Connect to MongoDB database
const connection = mongoose.connect(CONFIG_URI);


module.exports = connection;
