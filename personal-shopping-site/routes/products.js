const express = require('express'); 
const router = express.Router();

// Mock data
const products = [
    { id: 1, name: 'Minimal', category: 'Minimalist', price: 50, isBundle: true, images: ['/images/minimal-creative-mockup.png','/images/minimal-explore-mockup.png'] },
    { id: 2, name: 'Nature', category: 'Minimalist', price: 50, isBundle: false, image: '/images/nature-flower-1-mockup.png' },
    { id: 3, name: 'Colourful', category: 'Nature', price: 120, isBundle: false, image: '/images/colourful-focus-mockup.png' }
];

// Category page (list all products)
router.get('/', (req, res) => {
    res.render('category', { products });
});

// Product details page
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    res.render('product', { product });
});

// Handle "Buy Now" functionality
router.post('/buy', (req, res) => {
    const productId = req.body.productId;
    const product = products.find(p => p.id == productId);

    if (product) {
        res.send(`<h1>Thank you for buying ${product.name}!</h1><a href="/products">Continue Shopping</a>`);
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;
