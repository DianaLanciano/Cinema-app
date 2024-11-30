import express from 'express';
import verifyUserLoggedIn from '../utils/verifyUserLoggedIn.js';
import { getMovies, getMovie, getSearchResult, addMovie, updateMovie, deleteMovie } from '../controllers/movie.controllers.js'

const router = express.Router();

router.get("/", getMovies);

router.get("/search", getSearchResult);

router.get("/:movieId", getMovie);

router.post("/addMovie", verifyUserLoggedIn, addMovie);

router.put("/:movieId", verifyUserLoggedIn, updateMovie);

router.delete("/:movieId", verifyUserLoggedIn, deleteMovie);

export default router;