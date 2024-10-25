import express from 'express';
import { getMovies, getMovie, getSearchResult, addMovie, updateMovie, deleteMovie } from '../controllers/movie.controllers.js'

const router = express.Router();

router.get("/", getMovies);

router.get("/search", getSearchResult);

router.get("/:movieId", getMovie);

router.post("/addMovie", addMovie);

router.put("/:movieId", updateMovie);

router.delete("/:movieId", deleteMovie);

export default router;