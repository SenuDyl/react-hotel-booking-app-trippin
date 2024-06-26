import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: { type: String },
    country: { type: String },
    nationality: { type: String },
    bookings: { type: [String] }
    // Add other fields here
}, { timestamps: true });



// Creating a model from the schema
const User = mongoose.model('User', UserSchema);

export default User;
