import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = new User({ username, password });
		await user.save();
		res.status(201).send('User created');
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).send('Authentication failed');
		}
		const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
		res.status(200).send({ token });
	} catch (error) {
		res.status(500).send(error);
	}
});

export default router;
