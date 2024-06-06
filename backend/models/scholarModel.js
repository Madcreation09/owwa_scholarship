const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scholarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year_level: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    status: {
     type: String,
     required: true
 },  
    
}, {timestamps: true})


module.exports = mongoose.model('Review', scholarSchema)