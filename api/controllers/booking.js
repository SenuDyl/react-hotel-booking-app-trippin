import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const createBooking = async (req, res, next) => {
    const userId = req.params.userId;
    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();


        try {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $push: { bookings: savedBooking._id },
            }, { new: true });


        } catch (err) {
            console.error('Error updating user with booking ID:', err);
            return next(err);
        }
    } catch (err) {
        console.error('Error saving new booking:', err);
        return next(err);
    }
};

// router.post('/bookings', async (req, res, next) => {
//     const { userId, hotelId, rooms, dates } = req.body;

//     const newBooking = new Booking({
//         user: userId,
//         hotel: hotelId,
//         rooms: rooms,
//         dates: dates,
//         status: 'reserved'
//     });

//     try {
//         const savedBooking = await newBooking.save();

//         try {
//             await User.findByIdAndUpdate(userId, {
//                 $push: { bookings: savedBooking._id }
//             }, { new: true });

//             await Promise.all(
//                 rooms.map(roomId => {
//                     return Room.findByIdAndUpdate(roomId, {
//                         $push: { unavailableDates: { $each: dates } }
//                     });
//                 })
//             );

//             res.status(201).json(savedBooking);
//         } catch (err) {
//             console.error('Error updating user or rooms with booking ID:', err);
//             return next(err);
//         }
//     } catch (err) {
//         console.error('Error saving new booking:', err);
//         return next(err);
//     }
// });


export const getBooking = async (req, res, next) => {
    try {
        const booking = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
};

export const deleteBooking = async (req, res, next) => {
    try {
        // Delete the hotel from the database
        await Booking.findByIdAndDelete(req.params.id);
        // Send OK signal
        res.status(200).json("Booking has been deleted");
    } catch (error) {
        next(error);
    }
};

