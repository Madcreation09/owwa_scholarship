const express = require('express');
const Item = require('../models/itemModel');
const { getAllData, getData, store, deleteData, updateData } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllData)

router.get('/:id', getData)

router.delete('/:id', deleteData)

router.patch('/:id', updateData)

router.post('/', store)

module.exports = router;