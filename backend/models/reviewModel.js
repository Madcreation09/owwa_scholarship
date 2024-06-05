const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
    }, 
    
}, {timestamps: true})


module.exports = mongoose.model('Review', itemSchema)