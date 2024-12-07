import express from 'express';
import { handleSeatLock, getSeatStatus } from '../controllers/seat.controllers';

const router = express.Router();

router.get("/status/:showtimeId", getSeatStatus);

router.post("/lock", handleSeatLock);


