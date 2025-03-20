const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.post('/api/orders', async (req, res) => {
    try {
        const { name, phone, items } = req.body;

        console.log("Received data:", req.body); // Log the full request body

        if (!name || !phone || !items || items.length === 0) {
            console.error("Invalid order data received:", { name, phone, items });
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const newOrder = new Order({ name, phone, items });

        await newOrder.save();
        console.log("Order placed successfully!");
        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;



router.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});


module.exports = router;
