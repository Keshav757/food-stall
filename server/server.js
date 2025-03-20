const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Use order routes
app.use('/api/orders', orderRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



const Order = require('./models/Order');

app.post('/api/orders', async (req, res) => {
    const { name, item, quantity } = req.body;
    try {
        const newOrder = new Order({ name, item, quantity });
        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (err) {
        res.status(500).send({ error: 'Failed to place order' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch orders' });
    }
});