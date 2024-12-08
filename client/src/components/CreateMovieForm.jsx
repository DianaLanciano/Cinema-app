import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import useMovieStore from "../store/useMovieStore.js";

const CreateMovieForm = () => {
  const [loading, setLoading] = useState(false);
  const createMovie = useMovieStore((state) => state.createMovie);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    runtime: "",
    synopsis: "",
    posterUrl: "",
    actors: [],
    releaseDate: "",
    rating: "",
    ticketPrice: "",
    isVisible: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate actors array
      const validActors = newMovie.actors.filter(
        (actor) => actor.trim() !== ""
      );
      if (validActors.length === 0) {
        toast.error("Please add at least one actor");
        return;
      }

      // Convert and validate runtime
      const runtimeNumber = parseInt(newMovie.runtime);
      if (isNaN(runtimeNumber) || runtimeNumber <= 0) {
        toast.error("Please enter a valid runtime");
        return;
      }

      // Prepare movie data
      const movieToSubmit = {
        ...newMovie,
        actors: validActors,
        runtime: runtimeNumber,
        ticketPrice: Number(newMovie.ticketPrice),
        rating: Number(newMovie.rating),
        isVisible: newMovie.isVisible === "true",
      };

      // Submit to store
      await createMovie(movieToSubmit);

      // Reset form on success
      setNewMovie({
        title: "",
        genre: "",
        runtime: "",
        synopsis: "",
        posterUrl: "",
        actors: [],
        releaseDate: "",
        rating: "",
        ticketPrice: "",
        isVisible: "",
      });
    } catch (error) {
      // Error is already handled by the store
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="movie-title-container">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Movie Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMovie.title}
            onChange={(e) =>
              setNewMovie({ ...newMovie, title: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="movie-genre-container">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-300"
          >
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={newMovie.genre}
            onChange={(e) =>
              setNewMovie({ ...newMovie, genre: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
       py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
       focus:border-emerald-500"
            required
          >
            <option value="" disabled>
              Select a genre
            </option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
          </select>
        </div>

        <div className="movie-synopsis-container">
          <label
            htmlFor="synopsis"
            className="block text-sm font-medium text-gray-300"
          >
            Synopsis
          </label>
          <textarea
            type="text"
            id="synopsis"
            name="synopsis"
            value={newMovie.synopsis}
            onChange={(e) =>
              setNewMovie({ ...newMovie, synopsis: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="movie-poster-container">
          <label
            htmlFor="posterUrl"
            className="block text-sm font-medium text-gray-300"
          >
            Poster URL
          </label>
          <input
            type="url"
            id="posterUrl"
            name="posterUrl"
            value={newMovie.posterUrl}
            onChange={(e) =>
              setNewMovie({ ...newMovie, posterUrl: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
     px-3 text-white focus:outline-none focus:ring-2
    focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter movie poster URL"
            required
          />
        </div>

        <div className="movie-actors-container">
          <label
            htmlFor="actors"
            className="block text-sm font-medium text-gray-300"
          >
            Actors
          </label>
          {newMovie.actors.map((actor, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={actor}
                onChange={(e) => {
                  const updatedActors = [...newMovie.actors];
                  updatedActors[index] = e.target.value;
                  setNewMovie({ ...newMovie, actors: updatedActors });
                }}
                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={`Actor ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => {
                  const updatedActors = newMovie.actors.filter(
                    (_, i) => i !== index
                  );
                  setNewMovie({ ...newMovie, actors: updatedActors });
                }}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setNewMovie({ ...newMovie, actors: [...newMovie.actors, ""] })
            }
            className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none"
          >
            Add Actor
          </button>
        </div>

        <div className="movie-release-date-container">
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium text-gray-300"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={newMovie.releaseDate}
            onChange={(e) =>
              setNewMovie({ ...newMovie, releaseDate: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
     px-3 text-white focus:outline-none focus:ring-2
    focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="movie-runtime-container">
          <label
            htmlFor="runtime"
            className="block text-sm font-medium text-gray-300"
          >
            Runtime (minutes)
          </label>
          <input
            type="number"
            id="runtime"
            name="runtime"
            value={newMovie.runtime}
            onChange={(e) =>
              setNewMovie({ ...newMovie, runtime: e.target.value })
            }
            min="1"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
    px-3 text-white focus:outline-none focus:ring-2
    focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter movie duration in minutes"
            required
          />
        </div>

        <div className="movie-rating-container">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-300"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={newMovie.rating}
            onChange={(e) =>
              setNewMovie({ ...newMovie, rating: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
     py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
     focus:border-emerald-500"
            required
          >
            <option value="" disabled>
              Select Rating
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="movie-ticket-price-container">
          <label
            htmlFor="ticketPrice"
            className="block text-sm font-medium text-gray-300"
          >
            Ticket Price
          </label>
          <input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            value={newMovie.ticketPrice}
            onChange={(e) =>
              setNewMovie({ ...newMovie, ticketPrice: e.target.value })
            }
            min="0"
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
     px-3 text-white focus:outline-none focus:ring-2
    focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="movie-visibility-container">
          <label
            htmlFor="isVisible"
            className="block text-sm font-medium text-gray-300"
          >
            Visibility
          </label>
          <select
            id="isVisible"
            name="isVisible"
            value={newMovie.isVisible}
            onChange={(e) =>
              setNewMovie({ ...newMovie, isVisible: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
     py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
     focus:border-emerald-500"
            required
          >
            <option value="" disabled>
              Select Visibility
            </option>
            <option value="true">Visible</option>
            <option value="false">Hidden</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          // disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateMovieForm;
