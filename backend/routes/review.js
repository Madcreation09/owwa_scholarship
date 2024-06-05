const express = require('express');
const Item = require('../models/reviewModel');
const { getAllData, getData, store, updateData } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getAllData)

router.get('/:id', getData)

router.patch('/:id', updateData)

router.post('/', store)

module.exports = router;