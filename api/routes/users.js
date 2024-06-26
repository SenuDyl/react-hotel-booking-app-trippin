import express from "express";
import { getUserBookings, updateUser, cancelUserBookings } from "../controllers/user.js";
import { deleteUser } from "../controllers/user.js";
import { getUser } from "../controllers/user.js";
import { getAllUsers } from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin, you are logged in and you can delete all accounts")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL - Fetch all Users
router.get("/", verifyAdmin, getAllUsers);
router.get("/booking/:id", getUserBookings)
router.put("/booking/:userId/:bookingId", cancelUserBookings)
export default router;
