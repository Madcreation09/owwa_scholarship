const Data = require('../models/userModel')
const mongoose = require('mongoose')

const getAllData = async(req, res) => {
    const data = await Data.find({})
    res.status(200).json(data)
}

const getData = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Data.findById(id);
        if (!data) {
            return res.status(400).json({ error: "No record found!" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const store = async (req, res) => {
    const {name, password, email, address, phone, user_type} = req.body

    try {
        const data = await Data.create({
            name,
            password,
            email,
            address,
            phone,
            user_type
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteData = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }
    const data = await Data.findByIdAndDelete({_id: id})
    if (!data) {
        return res.status(400).json({error: 'Record not found'})
    }
    return res.status(200).json({message: 'Successfully deleted data'})
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
    deleteData,
    updateData
}