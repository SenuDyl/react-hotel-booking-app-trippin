import express from "express";
import {
    createBooking,
    getBooking,
    deleteBooking
} from "../controllers/booking.js";

const router = express.Router();

router.post("/:userId", createBooking);
router.get("/:id", getBooking);
router.delete("/:id", deleteBooking);

export default router;
