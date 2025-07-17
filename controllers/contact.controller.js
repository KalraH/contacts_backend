import { CONSTANTS } from '../constants.js';
import asyncHandler from 'express-async-handler';
import { Contact } from '../models/contact.model.js';
import { ErrorHandler } from '../utils/errorHandler.js';
import { ResponseHandler } from '../utils/responseHandler.js';

/**
 * @description Get All Contacts.
 * @route GET /contacts
 * @access Private
 */
const getContacts = asyncHandler( async (req, res) => {
	const contacts = await Contact.find({ user_id: req.user._id });

	if (!contacts || contacts.length === 0) {
		throw new ErrorHandler(CONSTANTS.NOT_FOUND, 'No contacts found.');
	}
	
	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.SUCCESS, 'Get All Contacts.', contacts ));
})

/**
 * @description Get Single Contacts.
 * @route GET /contacts/:id
 * @access Private
 */
const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		throw new ErrorHandler(CONSTANTS.NOT_FOUND, 'Contact not found.');
	}

	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.SUCCESS, `Get Contact for ${req.params.id}`, contact ));
})

/**
 * @description Create a Contact.
 * @route POST /contacts
 * @access Private
 */
const createContacts = asyncHandler(async (req, res) => {
	if (!req.body) {
		throw new ErrorHandler(CONSTANTS.VALIDATION_ERROR, 'Please fill all fields.');
	}

	const {name, email, phone, age} = req.body;
	if(!name || !email || !phone || !age) {
		throw new ErrorHandler(CONSTANTS.VALIDATION_ERROR, 'Please fill all fields.');
	}

	const contact = await Contact.create({ name, email, phone, age, user_id: req.user._id });
	if (!contact) {
		throw new ErrorHandler(CONSTANTS.INTERNAL_SERVER_ERROR, 'Contact creation failed.');
	}

	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.CREATED, 'Contact created successfully', contact ));
})

/**
 * @description Update a Contact.
 * @route PUT /contacts/:id
 * @access Private
 */
const updateContacts = asyncHandler( async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		throw new ErrorHandler(CONSTANTS.NOT_FOUND, 'Contact not found.');
	}

	if (contact.user_id.toString() !== req.user._id.toString()) {
		throw new ErrorHandler(CONSTANTS.UNAUTHORIZED, 'You are not authorized to update this contact.');
	}

	const updatedContact = await Contact.findByIdAndUpdate(
						req.params.id,
						req.body,
						{ new: true }
					);

	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.SUCCESS, `Updated contact for ${req.params.id}`, updatedContact ));
})

/**
 * @description Delete a Contact.
 * @route DELETE /contacts/:id
 * @access Private
 */
const deleteContacts = asyncHandler(async (req, res) => {

	const contact = await Contact.findById(req.params.id);
	if (contact.user_id.toString() !== req.user._id.toString()) {
		throw new ErrorHandler(CONSTANTS.UNAUTHORIZED, 'You are not authorized to update this contact.');
	}
	await Contact.deleteOne({ _id: req.params.id });

	res.status(CONSTANTS.SUCCESS).json( new ResponseHandler( CONSTANTS.SUCCESS, `Contact Deleted for ${req.params.id}` ));
})

export { getContacts, getContact, createContacts, updateContacts, deleteContacts };