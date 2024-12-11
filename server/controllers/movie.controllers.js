import Movie from "../models/movie.model.js";
import { publisher } from "../pubsub/index.js";

export const getMovies = async (req, res) => {
  const { searchCriteria } = req.body;
 
  try {
    let query = {};

    if (searchCriteria) {
      const { genre, actors } = searchCriteria;
      // Build query conditions based on provided criteria
      if (genre) {
        query.genre = { $in: genre };
      }
      if (actors && actors.length > 0) {
        query.actors = { $in: actors };
      }
    }

    const movies = await Movie.find(query);
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

  const { searchTerm } = req.body;
  let query = {};

  try {
    if (searchTerm && searchTerm.length >= 3) {
      query.$or = [
        // Search in title
        { title: { $regex: searchTerm, $options: 'i' } },
        // Search in actors array
        { actors: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    const movies = await Movie.find(query);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Server error while trying get movies" });
  }
}

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
    console.log(
      "Error server/controllers/movies.controller > addMovie",
      error.message
    );
    // Send an error response if saving fails
    res
      .status(400)
      .json({ message: "Failed to add movie", error: error.message });
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
