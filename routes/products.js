const express = require('express');
const router = express.Router();

// In-memory product storage for demonstration purposes
let products = [];

// CREATE: Add a new product
router.post('/', (req, res) => {
    const product = req.body;
    product.id = products.length + 1; // Simple ID assignment
    products.push(product);
    res.status(201).json(product);
});

// READ: Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// READ: Get a single product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// UPDATE: Modify a product by ID
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    Object.assign(product, req.body);
    res.json(product);
});

// DELETE: Remove a product by ID
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Product not found');
    products.splice(index, 1);
    res.status(204).send();
});

module.exports = router;