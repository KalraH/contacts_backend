import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	phone: {
		type: String,
		required: [true, 'Phone number is required'],
		unique: true,
	},
	age: {
		type: Number,
		required: [true, 'Age is required'],
		min: [0, 'Age cannot be negative'],
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
}, 
{
	timestamps: true
});

export const Contact = mongoose.model('Contact', contactSchema);