import express from 'express';
import { getAllShowtime, createShowTime, updateShowTime, deleteShowTime } from '../controllers/showTime.controllers.js';

const router = express.Router();

router.get('/', getAllShowtime); // Fetch all showtimes with optional filtering (e.g., by date, movie ID)

router.post("/create", createShowTime); // Admin only

router.put("/update/:showTimeId", updateShowTime); // Admin only

router.delete("delete/:showTimeId", deleteShowTime); // Admin only
 
 export default router;