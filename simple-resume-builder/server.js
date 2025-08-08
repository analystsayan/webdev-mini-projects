const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json()); // Use built-in JSON parser

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((error) => console.error('Database connection failed:', error));

// Mongoose Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Define the /signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'All fields are required.' });
    }

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user.', error });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));