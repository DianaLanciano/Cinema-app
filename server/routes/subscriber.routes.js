import express from 'express';
import { getSubscriber, addSubscriber } from '../controllers/subscriber.controllers.js'; 

const router = express.Router();

router.get("/", getSubscriber);

router.post("/addSubscriber", addSubscriber);

export default router;