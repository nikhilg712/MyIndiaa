// Import the express-async-handler module to handle asynchronous errors in Express
const asyncHandler = require('express-async-handler');

// Import the Order model
const Order = require('../models/order');

// Controller function to add order items
const addOrderItems = asyncHandler(async (req, res) => {
    // Extract order items and payment details from the request body
    const { orderItems, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;

    // Check if order items are present, if not, respond with a 400 status code and an error message
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        // Create a new order with the provided details and the user ID from the request
        const order = new Order({
            orderItems,
            user: req.user._id,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        // Save the order to the database
        const createdOrder = await order.save();
        // Respond with the created order and a 201 status code
        res.status(201).json(createdOrder);
    }
});

// Controller function to get an order by ID
const getOrderById = asyncHandler(async (req, res) => {
    // Find the order by ID and populate the user field with name and email
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    // If order is found, respond with the order data
    if (order) {
        res.json(order);
    } else {
        // If order is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('Order not found');
    }
});

// Controller function to update an order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    // If order is found, update the payment status and details
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        // Save the updated order to the database
        const updatedOrder = await order.save();
        // Respond with the updated order data
        res.json(updatedOrder);
    } else {
        // If order is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('Order not found');
    }
});

// Controller function to update an order to delivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    // If order is found, update the delivery status and timestamp
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        // Save the updated order to the database
        const updatedOrder = await order.save();
        // Respond with the updated order data
        res.json(updatedOrder);
    } else {
        // If order is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('Order not found');
    }
});

// Controller function to get orders of the authenticated user
const getMyOrders = asyncHandler(async (req, res) => {
    // Find orders by the user ID from the request
    const orders = await Order.find({ user: req.user._id });
    // Respond with the user's orders
    res.json(orders);
});

// Controller function to get all orders (admin)
const getAllOrders = asyncHandler(async (req, res) => {
    // Find all orders and populate the user field with ID and name
    const orders = await Order.find({}).populate('user', 'id name');
    // Respond with all orders
    res.json(orders);
});

// Export the controller functions
module.exports = { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getAllOrders };
