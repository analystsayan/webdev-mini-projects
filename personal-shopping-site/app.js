const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine
app.set('view engine', 'ejs');

// Routes
app.use('/products', productsRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the E-Commerce Site!</h1><a href="/products">View Products</a>');
});

// Start the server
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
