const Person = require('../models/Person');

exports.getAllPeople = async (req, res) => {
	try {
		const people = await Person.find({});
		const sortedPeople = people.sort((a, b) => a.index - b.index);
		res.status(200).json(sortedPeople);
	} catch (error) {
		console.error('Error processing file:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

exports.deletePerson = async (req, res) => {
	const _id = req.params.id;
	await Person.deleteOne({ _id });
};

exports.deleteAllPeople = async (req, res) => {
	try {
		const deletedAll = await Person.deleteMany({});
		res
			.status(204)
			.json({ message: 'All people were deleted from the database' });
	} catch (error) {
		console.error('Error processing file:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
