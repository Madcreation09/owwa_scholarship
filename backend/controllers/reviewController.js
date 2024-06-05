const Data = require('../models/reviewModel')
const mongoose = require('mongoose')

const getAllData = async (req, res) => {
    const data = await Data.find({})
    res.status(200).json(data)
}

const getData = async (req, res) => {
    
}

const store = async (req, res) => {
    const {userId, itemId, review, rating} = req.body

    try {
        const data = await Data.create({userId, itemId, review, rating})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateData = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }

    const data = await Data.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!data) {
        return res.status(400).json({error: 'Record not found'})
    }

    return res.status(200).json({message: 'Update Successfull'})
}

module.exports = {
    getAllData,
    getData,
    store,
    updateData
}