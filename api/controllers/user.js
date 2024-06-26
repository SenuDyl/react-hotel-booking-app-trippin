import User from "../models/User.js";

// No need for createUser Function since we have already created a register function in the auth.js file

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        // Delete the User from the database
        await User.findByIdAndDelete(req.params.id);
        // Send OK signal
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error)
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export const getAllUsers = async (req, res, next) => {
    // const failed=true

    // if (failed) return next(createError(401,"You are not authenticated"))
    try {
        const users = await User.find();
        //const Users=await User.findById("jsjdhfjhd");
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}