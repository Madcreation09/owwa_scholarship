const express = require('express');
const User = require('../models/userModel');
const { store, getAllData, getData, deleteData, updateData } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllData)

router.get('/:id', getData)

router.post('/', store)

router.delete('/:id', deleteData)

router.patch('/:id', updateData)

module.exports = router;