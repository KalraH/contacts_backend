import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../constants.js';
import { User } from '../models/user.model.js';
import asyncHandler from 'express-async-handler';
import { ErrorHandler } from '../utils/errorHandler.js';
import { ResponseHandler } from '../utils/responseHandler.js';

/**
 * @description Register a User.
 * @route POST /register
 * @param {Object} req - Request object containing user data.	
 * @access Public
 */
const createUser = asyncHandler( async (req, res) => {
	const { userName, email, password } = req.body;
	if (!userName || !email || !password) {
		throw new ErrorHandler(CONSTANTS.VALIDATION_ERROR, 'Please provide all required fields.');
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		throw new ErrorHandler(CONSTANTS.VALIDATION_ERROR, 'User already exists with this email.');
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	if (!hashedPassword) {
		throw new ErrorHandler(CONSTANTS.INTERNAL_SERVER_ERROR, 'Password hashing failed.');
	}

	const user = await User.create({ userName, email, password: hashedPassword });
	const createdUser = await User.findById(user._id).select('-password');

	if (!createUser) {	
		throw new ErrorHandler(CONSTANTS.INTERNAL_SERVER_ERROR, 'User registration failed.');
	}

	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.CREATED, 'User registraion Successful.', createdUser ));
})

/**
 * @description Register a User.
 * @route POST /login
 * @access Public
 */
const loginUser = asyncHandler( async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new ErrorHandler(CONSTANTS.VALIDATION_ERROR, 'Please provide all required fields.');
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		throw new ErrorHandler(CONSTANTS.NOT_FOUND, 'User not found with this email.');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new ErrorHandler(CONSTANTS.UNAUTHORIZED, 'Invalid email or password.');
	}
	
	const accessToken = jwt.sign(
		{ userId: user._id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRATION || '1d' }
	);

	if (!accessToken) {
		throw new ErrorHandler(CONSTANTS.INTERNAL_SERVER_ERROR, 'Token generation failed.', { userId: user._id, email: user.email, accessToken: null });
	}	

	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.SUCCESS, 
								 `User ${user.userName} logged-in.`, 
								 { userId: user._id, 
								   email: user.email, 
								   accessToken: accessToken } ));
})

/**
 * @description Get Current User.
 * @route GET /current
 * @access Private
 */
const getCurrentUser = asyncHandler( async (req, res) => {
	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.SUCCESS, 'Current user received.', req.user ));
})

export { createUser, loginUser, getCurrentUser };