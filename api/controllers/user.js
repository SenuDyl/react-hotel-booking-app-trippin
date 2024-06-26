import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

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

export const getUserBookings = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const list = await Promise.all(
            user.bookings.map((bookings) => {
                return Booking.findById(bookings)
            })
        )
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const cancelUserBookings = async (req, res, next) => {
    const { userId, bookingId } = req.params;

    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the booking by bookingId
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Update booking status to "canceled"
        booking.status = "canceled";
        await booking.save();

        // Remove the booking ID from the user's bookings array
        user.bookings.pull(bookingId);
        await user.save();

        // Update room availability
        await Promise.all(
            booking.rooms.map(async (roomId) => {
                const room = await Room.findById(roomId);
                if (room) {
                    room.roomNumbers.forEach(roomNumber => {
                        roomNumber.unavailableDays = roomNumber.unavailableDays.filter(date => {
                            return !booking.dates.includes(date);
                        });
                    });
                    await room.save();
                }
            })
        );

        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (err) {
        next(err);
    }
};
