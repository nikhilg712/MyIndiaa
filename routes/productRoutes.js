const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController'); // Import product controller functions
const { protect } = require('../middleware/authMiddleware'); // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Route to get all products and create a new product
router.route('/')
    .get(getProducts) // GET endpoint to retrieve all products
    .post(protect, createProduct); // POST endpoint to create a new product, protected route

// Route to get, update, and delete a specific product by ID
router.route('/:id')
    .get(getProductById) // GET endpoint to retrieve a product by ID
    .put(protect, updateProduct) // PUT endpoint to update a product by ID, protected route
    .delete(protect, deleteProduct); // DELETE endpoint to delete a product by ID, protected route

module.exports = router; // Export the router for use in other files
