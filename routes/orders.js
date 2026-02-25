const express = require('express');
const router = express.Router();

let orders = []; // In-memory storage for orders

// GET all orders
router.get('/', (req, res) => {
    res.json(orders);
});

// GET order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

// POST new order
router.post('/', (req, res) => {
    const { id, item, quantity } = req.body;
    const newOrder = { id, item, quantity };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// PUT update order by ID
router.put('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');

    const { item, quantity } = req.body;
    order.item = item;
    order.quantity = quantity;
    res.json(order);
});

// DELETE order by ID
router.delete('/:id', (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) return res.status(404).send('Order not found');
    orders.splice(orderIndex, 1);
    res.status(204).send();
});

module.exports = router;