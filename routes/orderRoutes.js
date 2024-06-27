const express = require('express');
const { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getAllOrders } = require('../controllers/orderController'); // Import order controller functions
const { protect } = require('../middleware/authMiddleware'); // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Route to add order items and get all orders
router.route('/').post(protect, addOrderItems) // POST endpoint to add order items, protected route
                .get(protect, getAllOrders); // GET endpoint to get all orders, protected route

// Route to get user's orders
router.route('/myorders').get(protect, getMyOrders); // GET endpoint to get the logged-in user's orders, protected route

// Route to get order by ID
router.route('/:id').get(protect, getOrderById); // GET endpoint to get a specific order by ID, protected route

// Route to update order to paid
router.route('/:id/pay').put(protect, updateOrderToPaid); // PUT endpoint to update order to paid status, protected route

// Route to update order to delivered
router.route('/:id/deliver').put(protect, updateOrderToDelivered); // PUT endpoint to update order to delivered status, protected route

module.exports = router; // Export the router for use in other files
