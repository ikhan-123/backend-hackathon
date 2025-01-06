import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';

// Place a new order
export const createOrder = async (req, res) => {
    const { products } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user

    try {
        // Calculate total price
        let totalPrice = 0;
        for (const productId of products) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${productId} not found` });
            }
            totalPrice += product.price;
        }

        const newOrder = new Order({ user: userId, products, totalPrice });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
};

// List all orders for the authenticated user
export const getOrders = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user

    try {
        const orders = await Order.find({ user: userId }).populate('products');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get the details of a single order by its ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('products');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};