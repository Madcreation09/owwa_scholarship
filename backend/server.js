require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoutes = require('./routes/auth');
const itemRoute = require('./routes/item');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const reviewRoute = require('./routes/review');
const cors = require('cors');

const app = express();

// Registered Device only
app.use(cors({
    origin: '*', // Allow all origins for development
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute)
app.use('/auth', authRoutes);
app.use('/item', itemRoute);
app.use('/cart', cartRoute);
app.use('/review', reviewRoute);

app.use('/order', orderRoute);




mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Successfully connected to Database & Listening port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

