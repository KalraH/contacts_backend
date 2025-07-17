import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userName: {
		type: String,	
		required: true,
		unique: true,
	}, 
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false, // Exclude password from queries by default
	}
}, 
{
	timestamps: true
});

export const User = mongoose.model('User', userSchema);