import Movie from "../models/movie.model.js";
import { publisher } from "../pubsub/index.js";

export const getMovies = async (req, res) => {
  const { searchCriteria } = req.body;
  let movies = [];
  /*
            searchCriteria = {
                actors: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson"],
                rating: 5,
                genre: "Fantasy",
            }
        */
  try {
    if (!searchCriteria) {
      movies = await Movie.find();
    } else {
      movies = await Movie.find({
        // Filter by genre
        genre: searchCriteria.genre,
        // Filter by rating
        rating: searchCriteria.rating,
        // Filter by actors (at least one of the actors in searchCriteria should be present)
        actors: { $in: searchCriteria.actors },
        // Additional condition to only return movies that are visible
        isVisible: true,
      });
    }
    res.status(200).json(movies);
  } catch (error) {
    console.log(
      "Error server/controllers/movies.controller > getMovies",
      error.message
    );
    res.status(500).json({ error: "Server error while trying get movies" });
  }
};

export const getMovie = async (req, res) => {

  const { movieId } = req.params;
  try {
    
  const movie = await Movie.findOne({ _id: movieId });
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.send(`No movie with id: ${movieId}`);
  }
  } catch (error) {
    console.log(
        "Error server/controllers/movies.controller > getMovie",
        error.message
      );
      res.status(500).json({ error: "Server error while trying get movie" });
  }
};

export const getSearchResult = async (req, res) => {

  console.log("getSearchResult function");
  res.send("getSearchResult endpoint");
};

export const addMovie = async (req, res) => {
  const {
    title,
    genre,
    runtime,
    synopsis,
    actors,
    releaseDate,
    rating,
    ticketPrice,
  } = req.body;

  if (
    !title ||
    !genre ||
    !runtime ||
    !synopsis ||
    !releaseDate ||
    !rating ||
    !ticketPrice
  ) {
    res.status(400).json({ error: "Some data is missing..." });
  }

  try {
    // Create a new movie instance with the provided data
    const newMovie = new Movie({
      title,
      genre,
      runtime,
      synopsis,
      actors,
      releaseDate,
      rating: rating || 3, // Use default value if rating is not provided
      ticketPrice,
    });
    // Save the new movie document to the database
    const savedMovie = await newMovie.save();
     // Publish to Redis on the 'newMovieUpdate' channel
      // Publish the new movie update to the 'newMovieUpdate' channel
    await publisher.publish("newMovieUpdate", JSON.stringify(savedMovie));
    // Send a success response with the saved movie data
    res.status(201).json(savedMovie);
  } catch (error) {
    console.log("Error server/controllers/movies.controller > addMovie", error.message);
    // Send an error response if saving fails
    res.status(400).json({ message: "Failed to add movie", error: error.message });
  }
};

export const updateMovie = async (req, res) => {
    const { movieId } = req.params;

    try {
        // Use findByIdAndUpdate for a more concise update
        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            { $set: req.body }, // Updates only provided fields in req.body
            { new: true, runValidators: true } // Options to return updated doc and validate
        );

        // Check if the movie exists
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Respond with the updated movie data
        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating movie" });
    }
};

export const deleteMovie = async (req, res) => {
  
    const { movieId } = req.params;
    try {
      
    const movieToDelete = await Movie.findByIdAndDelete({ _id: movieId });
    if (movieToDelete) {
      res.status(200).json(`Movie is deleted ${movieToDelete}`);
    } else {
      res.send(`No movie with id: ${movieId}`);
    }
    } catch (error) {
      console.log(
          "Error server/controllers/movies.controller > deleteMovie",
          error.message
        );
        res.status(500).json({ error: "Server error while trying get movie" });
    }
};
