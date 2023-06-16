const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
	{
		index: {
			type: String,
			required: [true, 'Index is required'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			index: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: [true, 'First name is required'],
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
		},
		phone: {
			type: String,
		},
		dateOfBirth: {
			type: String,
		},
		jobTitle: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
