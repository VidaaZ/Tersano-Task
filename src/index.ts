import express from 'express';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const callbackServer = () => {
	console.log(`Server is running on port ${PORT}`);
};
mongoose
	.connect('mongodb://localhost:27017', {})
	.then(() => console.log('MongoDB connected successfully.'))
	.catch((err) => console.error('MongoDB connection error:', err));
app.get('/', (req, res) => {
	res.send('Hello Vida!');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register the authentication routes with the app
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.listen(PORT, callbackServer);
