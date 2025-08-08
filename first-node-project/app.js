const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // To parse JSON body

// Serve static files from the "public" folder
app.use(express.static('public'));

// API route to send data
app.get('/api/data', (req, res) => {
    const data = { message: 'This is data from the backend!' };
    res.json(data);
});

// Fallback route for the root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
