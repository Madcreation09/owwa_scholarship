const express = require('express');
const Item = require('../models/cartModel');
const { getAllData, getData, store, deleteData, updateData } = require('../controllers/cartController');

const router = express.Router();

router.get('/', getAllData)
router.get('/:id', getData)
router.post('/', store)
router.delete('/:id', deleteData)
router.patch('/:id', updateData)

module.exports = router;