const express = require('express');
const peopleController = require('../controllers/people');
const router = express.Router();

router.get('/', peopleController.getAllPeople);
router.delete('/:id', peopleController.deletePerson);
router.delete('/', peopleController.deleteAllPeople);

module.exports = router;
