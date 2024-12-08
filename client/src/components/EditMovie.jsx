// pages/EditMovie.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, Loader, Trash2 } from "lucide-react";
import useMovieStore from "../store/useMovieStore";
import toast from "react-hot-toast";

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { updateMovie, deleteMovie, getMovieById, fetchMovies } = useMovieStore();

  const [movieData, setMovieData] = useState({
    title: "",
    posterUrl: "",
    genre: "",
    runtime: "",
    synopsis: "",
    actors: [],
    releaseDate: "",
    rating: "",
    ticketPrice: "",
    isVisible: "",
  });

  useEffect(() => {
    const loadMovie = async () => {
      await fetchMovies();
      const movie = getMovieById(movieId);
      if (movie) {
        setMovieData({
          ...movie,
          releaseDate: new Date(movie.releaseDate).toISOString().split('T')[0],
        });
      } else {
        toast.error("Movie not found");
        navigate("/dashboard");
      }
    };
    loadMovie();
  }, [movieId, getMovieById, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const validActors = movieData.actors.filter(actor => actor.trim() !== "");
      if (validActors.length === 0) {
        toast.error("Please add at least one actor");
        return;
      }

      const runtimeNumber = parseInt(movieData.runtime);
      if (isNaN(runtimeNumber) || runtimeNumber <= 0) {
        toast.error("Please enter a valid runtime");
        return;
      }

      const updatedMovie = {
        ...movieData,
        actors: validActors,
        runtime: runtimeNumber,
        ticketPrice: Number(movieData.ticketPrice),
        rating: Number(movieData.rating),
        isVisible: movieData.isVisible === "true",
      };

      await updateMovie(movieId, updatedMovie);
      toast.success("Movie updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to update movie");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(movieId);
        toast.success("Movie deleted successfully");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Failed to delete movie");
      }
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-emerald-300">
          Edit Movie: {movieData.title}
        </h2>
        <button
          onClick={handleDelete}
          className="p-2 bg-rose-600 rounded-md hover:bg-rose-700 transition-colors flex items-center"
        >
          <Trash2 size={20} className="mr-2" />
          Delete Movie
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="movie-title-container">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Movie Name
          </label>
          <input
            type="text"
            id="title"
            value={movieData.title}
            onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
             px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Poster URL */}
        <div className="movie-poster-container">
          <label htmlFor="posterUrl" className="block text-sm font-medium text-gray-300">
            Poster URL
          </label>
          <input
            type="url"
            id="posterUrl"
            value={movieData.posterUrl}
            onChange={(e) => setMovieData({ ...movieData, posterUrl: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
             px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Genre */}
        <div className="movie-genre-container">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-300">
            Genre
          </label>
          <select
            id="genre"
            value={movieData.genre}
            onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
             py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="" disabled>Select a genre</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
          </select>
        </div>

        {/* Synopsis */}
        <div className="movie-synopsis-container">
          <label htmlFor="synopsis" className="block text-sm font-medium text-gray-300">
            Synopsis
          </label>
          <textarea
            id="synopsis"
            value={movieData.synopsis}
            onChange={(e) => setMovieData({ ...movieData, synopsis: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
             px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Actors */}
        <div className="movie-actors-container">
          <label htmlFor="actors" className="block text-sm font-medium text-gray-300">
            Actors
          </label>
          {movieData.actors.map((actor, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={actor}
                onChange={(e) => {
                  const updatedActors = [...movieData.actors];
                  updatedActors[index] = e.target.value;
                  setMovieData({ ...movieData, actors: updatedActors });
                }}
                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
                 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={`Actor ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => {
                  const updatedActors = movieData.actors.filter((_, i) => i !== index);
                  setMovieData({ ...movieData, actors: updatedActors });
                }}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setMovieData({ 
              ...movieData, 
              actors: [...movieData.actors, ""] 
            })}
            className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none"
          >
            Add Actor
          </button>
        </div>

        {/* Release Date */}
        <div className="movie-release-date-container">
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-300">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            value={movieData.releaseDate}
            onChange={(e) => setMovieData({ ...movieData, releaseDate: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
             px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Runtime */}
        <div className="movie-runtime-container">
          <label htmlFor="runtime" className="block text-sm font-medium text-gray-300">
            Runtime (minutes)
          </label>
          <input
            type="number"
            id="runtime"
            value={movieData.runtime}
            onChange={(e) => setMovieData({ ...movieData, runtime: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
             px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            min="1"
            required
          />
        </div>

        {/* Rating */}
        <div className="movie-rating-container">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-300">
            Rating
          </label>
          <select
            id="rating"
            value={movieData.rating}
            onChange={(e) => setMovieData({ ...movieData, rating: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
             py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="" disabled>Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Ticket Price */}
        <div className="movie-ticket-price-container">
          <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-300">
            Ticket Price
          </label>
          <input
            type="number"
            id="ticketPrice"
            value={movieData.ticketPrice}
            onChange={(e) => setMovieData({ ...movieData, ticketPrice: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
             px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Visibility */}
        <div className="movie-visibility-container">
          <label htmlFor="isVisible" className="block text-sm font-medium text-gray-300">
            Visibility
          </label>
          <select
            id="isVisible"
            value={movieData.isVisible}
            onChange={(e) => setMovieData({ ...movieData, isVisible: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
             py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="" disabled>Select Visibility</option>
            <option value="true">Visible</option>
            <option value="false">Hidden</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mr-4 px-4 py-2 text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditMovie;