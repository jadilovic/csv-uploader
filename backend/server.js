const express = require('express');
const cors = require('cors');
const multer = require('multer');
const uploadRoutes = require('./routes/upload');
const peopleRoutes = require('./routes/people');
require('./db');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.use('/upload', upload.single('file'), uploadRoutes);

app.use('/people', peopleRoutes);

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
