import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
 },
    isAdmin:{
        type: Boolean,
        default:false
    }
},{timestamps:true});

// Creating a model from the schema
const User = mongoose.model('User', UserSchema);

export default User;
