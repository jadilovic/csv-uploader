const fs = require('fs');
const { parse } = require('csv-parse');
const Person = require('../models/Person');

const readDownloadedFile = async (path) => {
	fs.createReadStream(path)
		.pipe(
			parse({
				delimiter: ',',
				columns: true,
				ltrim: true,
			})
		)
		.on('data', async (csvFileRowObject) => {
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
				const newPerson = new Person(rowDataForMongo);
				await newPerson.save();
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
		});
};

exports.readAndSaveToDatabase = async (req, res) => {
	try {
		await readDownloadedFile(req.file.path);
		res.status(200).json({ message: 'File uploaded successfully' });
	} catch (error) {
		console.error('Error processing file:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
