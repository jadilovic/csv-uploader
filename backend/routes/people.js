const express = require('express');
const peopleController = require('../controllers/people');
const router = express.Router();

router.get('/', peopleController.getAllPeople);
router.delete('/:id', peopleController.deletePerson);

module.exports = router;
