import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../constants.js';
import { User } from '../models/user.model.js';
import asyncHandler from 'express-async-handler';
import { ErrorHandler } from '../utils/errorHandler.js';

const validateJwtToken = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new ErrorHandler(CONSTANTS.UNAUTHORIZED, 'Authorization header is missing or invalid.');
	}

	const token = authHeader?.split(' ')[1];
	if (!token) {
		throw new ErrorHandler(CONSTANTS.UNAUTHORIZED, 'No token provided.');
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log('decoded:', decoded);

		req.user = await User.findById(decoded.userId).select('-password');
		if (!req.user) {
			throw new ErrorHandler(CONSTANTS.UNAUTHORIZED, 'Invalid token.');
		}

		console.log('Token validated successfully:', decoded.user);
		next();
	} catch (error) {
		throw new ErrorHandler(CONSTANTS.UNAUTHORIZED, 'Token validation failed.');
	}
});

export { validateJwtToken };