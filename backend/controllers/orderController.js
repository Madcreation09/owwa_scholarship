const Data = require('../models/orderModel')
const ItemModel = require('../models/itemModel')
const UserModel = require('../models/userModel')
const ReviewModel = require('../models/reviewModel')
const mongoose =require('mongoose')

const getAllData = async (req, res) => {
    try {
      // Fetch all data from the Data model
      const data = await Data.find({});
  
      // Extract unique item IDs and user IDs from the data
      const itemIds = [...new Set(data.map(item => item.itemId))];
      const userIds = [...new Set(data.map(item => item.userId))];
  
      // Fetch item details using the extracted item IDs
      const itemData = await ItemModel.find({ _id: { $in: itemIds } });
      const userData = await UserModel.find({ _id: { $in: userIds } });
  
      // Combine data with item and user details
      const combinedData = data.map(item => {
        const itemDetail = itemData.find(i => i._id.toString() === item.itemId.toString());
        const userDetail = userData.find(u => u._id.toString() === item.userId.toString());
        return { ...item.toObject(), itemDetail, userDetail };
      });
  
      res.status(200).json(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const getDataById = async(req, res) => {
    const { id } = req.params;
    try {
        const data = await Data.findById(id);
        if (!data) {
            return res.status(400).json({ error: "No record found!" });
        }

        // Fetch item details using the extracted item IDs
        const itemData = await ItemModel.findById(data.itemId);

        const userData = await UserModel.findById(data.userId);

        // Combine cart data with item details
        const combinedData = {
            ...data._doc,  // Use _doc to get the plain JavaScript object if using Mongoose
            itemData: itemData,
            userData: userData,
        };

        
        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getData = async (req, res) => {
    const { id } = req.params;
    try {
        // Find all data for the given userId
        const data = await Data.find({ userId: id });
        if (!data || data.length === 0) {
            return res.status(400).json({ error: "No record found!" });
        }

        // Extract unique item IDs from the data
        const itemIds = [...new Set(data.map(cartItem => cartItem.itemId))];

        // Fetch item details using the extracted item IDs
        const itemData = await ItemModel.find({ _id: { $in: itemIds } });

        // Fetch review details using the extracted item IDs
        const reviewData = await ReviewModel.find({ userId: id, itemId: { $in: itemIds } });

        // Combine cart data with item details and review details
        const combinedData = data.map(cartItem => {
            const itemDetail = itemData.find(item => item._id.toString() === cartItem.itemId.toString());
            const reviewDetail = reviewData.find(review => review.itemId.toString() === cartItem.itemId.toString());
            return { ...cartItem.toObject(), itemDetail, reviewDetail };
        });

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const store = async (req, res) => {
    const order_status = 0
    const {userId, itemId, quantity, date, time, status, price} = req.body

    try {
        const data = await Data.create({userId, itemId, quantity, date, time, status, price, order_status})
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
    updateData,
    getDataById
}