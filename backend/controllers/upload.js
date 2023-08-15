const fs = require('fs');
const { parse } = require('csv-parse');
const Person = require('../models/Person');

const saveToDatabase = async (counter, rowData, res) => {
	try {
		counter.save++;
		const newPerson = new Person(rowData);
		await newPerson.save();
		console.log(counter);
		if (counter.read === counter.save) {
			console.log('test res: ', res.rawHeaders);
			return res.status(200).json({ message: 'All persons saved to database' });
		}
	} catch (error) {
		console.error('Error saving data to MongoDB:', error.message);
	}
};

const readDownloadedFile = async (path, res) => {
	const counter = { read: 0, save: 0 };
	fs.createReadStream(path)
		.pipe(
			parse({
				delimiter: ',',
				columns: true,
				ltrim: true,
			})
		)
		.on('data', async (csvFileRowObject) => {
			counter.read++;
			try {
				const rowDataForMongo = {
					index: csvFileRowObject['Index'],
					firstName: csvFileRowObject['First Name'],
					lastName: csvFileRowObject['Last Name'],
					email: csvFileRowObject['Email'],
					phone: csvFileRowObject['Phone'],
					dateOfBirth: csvFileRowObject['Date of birth'],
					jobTitle: csvFileRowObject['Job Title'],
				};
				saveToDatabase(counter, rowDataForMongo, res);
				// const newPerson = new Person(rowDataForMongo);
				// await newPerson.save();
				// countSave++;
			} catch (error) {
				console.error('Error saving data to MongoDB:', error.message);
			}
		})
		.on('error', async (error) => {
			console.log(error.message);
		})
		.on('finish', async () => {
			fs.unlink(path, (err) => {
				if (err) {
					throw err;
				}
			});
			console.log(counter);
		});
};

exports.readAndSaveToDatabase = async (req, res) => {
	try {
		await readDownloadedFile(req.file.path, res);
		// res.status(200).json({ message: 'File uploaded successfully' });
	} catch (error) {
		console.error('Error processing file:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
