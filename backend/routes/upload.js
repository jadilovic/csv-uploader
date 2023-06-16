const express = require('express');
const uploadController = require('../controllers/upload');
const router = express.Router();

router.post('/', uploadController.readAndSaveToDatabase);

module.exports = router;
