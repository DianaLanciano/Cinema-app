import Movie from "../models/movie.model.js";

export const getMovies = async (req, res) => {
  res.send("getMovies endpoint");
  const { searchCriteria } = req.body;
  let movies = [];
  try {
    if (!searchCriteria) {
      movies = await Movie.find();
      res.status(200).json(movies);
    }

    /*
            searchCriteria = {
                actors: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson"],
                rating: 5,
                genre: "Fantasy",
            }
        */

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
    res.status(200).json(movies);
  } catch (error) {
    console.log("Error server/controllers/movies.controller > getMovies", error.message);
    res.status(500).json({ error: "Server error while trying get movies" });
  }
};

export const getMovie = async (req, res) => {
  console.log("getMovie function");
  res.send("getMovie endpoint");
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
    createdAt,
    ticketPrice,
  } = req.body;

  if (!title || !genre || !runtime || ! synopsis || !releaseDate || !rating || !ticketPrice) {
    res.status(400).json({error:"Some data is missing..."});
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
        createdAt: Date.now(),
      });
       // Save the new movie document to the database
    const savedMovie = await newMovie.save();

    // Send a success response with the saved movie data
    res.status(201).json(savedMovie);
  } catch (error) {
    console.log("Error server/controllers/movies.controller > addMovie", error.message);
    // Send an error response if saving fails
    res.status(400).json({ message: "Failed to add movie", error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  res.send("updateMovie endpoint");
};

export const deleteMovie = async (req, res) => {
  res.send("deleteMovie endpoint");
};
