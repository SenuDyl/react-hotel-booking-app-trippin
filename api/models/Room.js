import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,  // Changed from Number to String
        required: true
    },
    roomNumbers: [{number:Number,unavailableDays:{type: [Date]}}],
}, {timestamps: true});

// Creating a model from the schema
const Room = mongoose.model('Room', roomSchema);

export default Room;
