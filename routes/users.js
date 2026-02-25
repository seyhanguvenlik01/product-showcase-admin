'use strict';

const express = require('express');
const router = express.Router();

// Mock user data
let users = [];

// Create a new user
router.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

// Get all users
router.get('/users', (req, res) => {
    res.json(users);
});

// Get a single user by ID
router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Update a user by ID
router.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex !== -1) {
        users[userIndex] = req.body;
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete a user by ID
router.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser);
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;
