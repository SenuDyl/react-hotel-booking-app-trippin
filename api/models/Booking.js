import mongoose from 'mongoose';
const { Schema } = mongoose;
import User from './User.js';
import Hotel from './Hotel.js';
import Room from './Room.js';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }],
    price: {
        type: Number,
    },
    dates: {
        type: [Date],

    },

    status: {
        type: String,
        enum: ['reserved', 'canceled'],
        default: 'reserved'
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
