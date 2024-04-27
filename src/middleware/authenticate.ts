import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
		if (!token) {
			return res.status(401).send({ message: 'No token provided' });
		}
		const decoded = jwt.verify(token, 'secretKey'); // same key as used in sign
		req.body.userID = decoded;
		next();
	} catch (error) {
		res.status(401).send({ message: 'Invalid or expired token' });
	}
};

export default authenticate;
