import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, createHotel, countByType, getHotelRooms, getHotelByCity, getHotelByType } from "../controllers/hotel.js";
import { updateHotel } from "../controllers/hotel.js";
import { deleteHotel } from "../controllers/hotel.js";
import { getHotel } from "../controllers/hotel.js";
import { getAllHotels } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);
//VerifyAdmin is a middleware function that checks if the user is an admin or not

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getHotel);
router.get("/findByName", getHotelByCity);
router.get("/findByType", getHotelByType);

// GET ALL - Fetch all hotels
router.get("/", getAllHotels);
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)


export default router;
