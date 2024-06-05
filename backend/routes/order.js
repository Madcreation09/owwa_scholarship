const express = require('express');
const Item = require('../models/orderModel');
const { getAllData, getData, store, deleteData, updateData, getDataById } = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllData)

router.get('/single/:id', getDataById)

router.get('/:id', getData)

router.delete('/:id', deleteData)

router.patch('/:id', updateData)

router.post('/', store)

module.exports = router;