const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    user_type: {
        type: Number,
    }, 
    
}, {timestamps: true})

// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     console.log(this.password)
//     next();
// });

// userSchema.methods.comparePassword = function(candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

userSchema.methods.comparePassword = function(candidatePassword) {
    return candidatePassword === this.password;
};

module.exports = mongoose.model('User', userSchema)