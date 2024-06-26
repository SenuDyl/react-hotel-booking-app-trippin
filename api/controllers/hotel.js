import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
    // Create a new hotel
    const newHotel = new Hotel(req.body);
    try {
        // Save the hotel to the database
        const savedHotel = await newHotel.save();
        // Send OK signal and the new hotel
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        // Save the hotel to the database
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        // Send OK signal and the new hotel
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        // Delete the hotel from the database
        await Hotel.findByIdAndDelete(req.params.id);
        // Send OK signal
        res.status(200).json("Hotel has been deleted");
    } catch (error) {
        next(error);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
};

export const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 }
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities ? req.query.cities.split(",") : [];

    if (cities.length === 0) {
        return res.status(400).json({ error: 'No cities provided' });
    }

    try {
        const list = await Promise.all(
            cities.map(city => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const guesthouseCount = await Hotel.countDocuments({ type: "guesthouse" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const bunglowCount = await Hotel.countDocuments({ type: "bunglow" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "guesthouse", count: guesthouseCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "bunglow", count: bunglowCount }
        ]);
    } catch (error) {
        next(error);
    }
};


export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        )
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}