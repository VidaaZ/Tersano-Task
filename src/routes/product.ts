import express from 'express';
import Product from '../models/product';
import authenticate from '../middleware/authenticate';

const router = express.Router();

// GET all products
router.get('/list', authenticate, async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching products', error });
	}
});

// POST a new product
router.post('/', authenticate, async (req, res) => {
	const { name, price, description, userID } = req.body;
	const product = new Product({ name, price, description });
	try {
		await product.save();
		res.status(201).json({ message: 'Product created', product, userID });
	} catch (error) {
		res.status(400).json({ message: 'Error creating product', error });
	}
});

// DELETE a product
router.delete('/:id', authenticate, async (req, res) => {
	try {
		const result = await Product.findByIdAndDelete(req.params.id);
		if (!result) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json({ message: 'Product deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting product', error });
	}
});

export default router;
