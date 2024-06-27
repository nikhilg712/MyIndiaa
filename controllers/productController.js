// Import the express-async-handler module to handle asynchronous errors in Express
const asyncHandler = require('express-async-handler');

// Import the Product model
const Product = require('../models/product');

// Controller function to get all products
const getProducts = asyncHandler(async (req, res) => {
    // Fetch all products from the database
    const products = await Product.find({});
    // Respond with the list of products
    res.json(products);
});

// Controller function to get a product by ID
const getProductById = asyncHandler(async (req, res) => {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // If the product is found, respond with the product data
    if (product) {
        res.json(product);
    } else {
        // If the product is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('Product not found');
    }
});

// Controller function to create a new product
const createProduct = asyncHandler(async (req, res) => {
    // Extract product details from the request body
    const { name, description, price, countInStock } = req.body;

    // Create a new product with the provided details
    const product = new Product({
        name,
        description,
        price,
        countInStock,
    });

    // Save the new product to the database
    const createdProduct = await product.save();
    // Respond with the created product and a 201 status code
    res.status(201).json(createdProduct);
});

// Controller function to update an existing product
const updateProduct = asyncHandler(async (req, res) => {
    // Extract updated product details from the request body
    const { name, description, price, countInStock } = req.body;

    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // If the product is found, update its details
    if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.countInStock = countInStock;

        // Save the updated product to the database
        const updatedProduct = await product.save();
        // Respond with the updated product data
        res.json(updatedProduct);
    } else {
        // If the product is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('Product not found');
    }
});

// Controller function to delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // If the product is found, remove it from the database
    if (product) {
        await product.remove();
        // Respond with a success message
        res.json({ message: 'Product removed' });
    } else {
        // If the product is not found, respond with a 404 status code and an error message
        res.status(404);
        throw new Error('Product not found');
    }
});

// Export the controller functions
module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
