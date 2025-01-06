import { Product } from '../models/product.model.js';

// Create a new product
export const createProduct = async (req, res) => {
    const { name, description, price, image, user, orderItems } = req.body;

    try {
        const newProduct = new Product({ name, description, price, image, user, orderItems });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user').populate('orderItems');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('user').populate('orderItems');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, user, orderItems } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, image, user, orderItems },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};