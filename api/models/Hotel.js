import mongoose from 'mongoose';
const { Schema } = mongoose;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,  // Changed from Number to String
        required: true
    },
    address: {
        type: String,  // Changed from Number to String
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: {
        type: [String],

    },
    rooms: {
        type: [String],

    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,


    }
});

// Creating a model from the schema
const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
