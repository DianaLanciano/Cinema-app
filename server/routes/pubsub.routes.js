import express from 'express';
import { newMovieUpdate } from "../controllers/pubsub.controller.js";

const router = express.Router();

router.post("/:genreId", newMovieUpdate);

export default router;