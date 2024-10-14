// Package
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Import User Model
const UserModel = require('../Models/user.model');

// Environment Variables
const SECRET_KEY = process.env.SECRET_KEY;

// User Router
const userRouter = express.Router();

// User Controller
userRouter.post('/register', async function (req, res) {
    const { username, email, password } = req.body;

    try {

        if (!username && !email && !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find Existing User
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new User
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error', error: err.message });
            }
            if (hash) {
                const newUser = new UserModel({
                    username,
                    email,
                    password: hash
                });
                await newUser.save();
                res.status(201).json({ message: 'User registered successfully', username });
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

userRouter.post('/login', async function (req, res) {
    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(401).json({ message: 'Wrong password', error: err });
            }
            if (result) {
                jwt.sign({ _id: user._id }, SECRET_KEY, (err, token) => {
                    if (err) {
                        console.log(err);
                        
                        return res.status(401).json({ message: "Errror while generating token", error: err.message });
                    }
                    return res.json({
                        message: 'User logged in successfully',
                        token: token,
                        username: user.username
                    })
                })
            }
            if(!result){
                return res.status(401).json({ message: 'Wrong password', error: 'Wront Credencials' });
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
})


module.exports = userRouter;