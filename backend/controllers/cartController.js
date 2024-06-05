const Data = require('../models/cartModel')
const ItemModel = require('../models/itemModel')
const mongoose = require('mongoose')

const getAllData = async (req, res) => {
    try {
        // Fetch cart data
        const data = await Data.find({});

        // Extract item IDs from cart data
        const itemIds = data.map(cartItem => cartItem.itemId);

        // Fetch item details using the extracted item IDs
        const itemData = await ItemModel.find({ _id: { $in: itemIds } });

        // Combine cart data with item details
        const combinedData = data.map(cartItem => {
            const itemDetail = itemData.find(item => item._id.toString() === cartItem.itemId.toString());
            return { ...cartItem.toObject(), itemDetail };
        });

        // Send response with combined data
        res.status(200).json(combinedData);
    } catch (error) {
        console.error('Error fetching cart data with items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getData = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Data.find({userId: id});
        if (!data) {
            return res.status(400).json({ error: "No record found!" });
        }

        // Extract item IDs from cart data
        const itemIds = data.map(cartItem => cartItem.itemId);

        // Fetch item details using the extracted item IDs
        const itemData = await ItemModel.find({ _id: { $in: itemIds } });

        // Combine cart data with item details
        const combinedData = data.map(cartItem => {
            const itemDetail = itemData.find(item => item._id.toString() === cartItem.itemId.toString());
            return { ...cartItem.toObject(), itemDetail };
        });

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const store = async (req, res) => {
    const {userId, itemId, quantity} = req.body

    try {
        const data = await Data.create({userId, itemId, quantity })
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