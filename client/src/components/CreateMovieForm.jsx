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
      className="container mx-auto px-6 py-8 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form Container */}
      <motion.div
        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <motion.h2
          className="text-2xl font-bold mb-8 text-rose-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Add New Movie
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Common input styles */}
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Movie Title
              </label>
              <input
                type="text"
                value={newMovie.title}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, title: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                required
              />
            </div>

            {/* Poster URL */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Poster URL
              </label>
              <input
                type="url"
                value={newMovie.posterUrl}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, posterUrl: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                required
              />
            </div>

            {/* Genre Select */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Genre</label>
              <select
                value={newMovie.genre}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, genre: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                required
              >
                <option value="" disabled>
                  Select genre
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

            {/* Synopsis */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Synopsis
              </label>
              <textarea
                value={newMovie.synopsis}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, synopsis: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors h-32"
                required
              />
            </div>

            {/* Actors */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Actors</label>
              <div className="space-y-2">
                {newMovie.actors.map((actor, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={actor}
                      onChange={(e) => {
                        const updatedActors = [...newMovie.actors];
                        updatedActors[index] = e.target.value;
                        setNewMovie({ ...newMovie, actors: updatedActors });
                      }}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                      placeholder="Actor name"
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
                      className="px-4 py-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500/20 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setNewMovie({
                      ...newMovie,
                      actors: [...newMovie.actors, ""],
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Add Actor
                </button>
              </div>
            </div>

            {/* Two columns grid for smaller inputs */}
<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="text-sm text-gray-300 mb-1 block">
      Release Date
    </label>
    <input
      type="date"
      value={newMovie.releaseDate}
      onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
      required
    />
  </div>

  <div>
    <label className="text-sm text-gray-300 mb-1 block">
      Runtime (minutes)
    </label>
    <input
      type="number"
      value={newMovie.runtime}
      onChange={(e) => setNewMovie({ ...newMovie, runtime: e.target.value })}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
      required
    />
  </div>

  <div>
    <label className="text-sm text-gray-300 mb-1 block">
      Rating
    </label>
    <select
      value={newMovie.rating}
      onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
      required
    >
      <option value="" disabled>Select rating</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>

  <div>
    <label className="text-sm text-gray-300 mb-1 block">
      Ticket Price ($)
    </label>
    <input
      type="number"
      value={newMovie.ticketPrice}
      onChange={(e) => setNewMovie({ ...newMovie, ticketPrice: e.target.value })}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
      min="0"
      step="0.01"
      required
    />
  </div>
</div>

{/* Visibility toggle */}
<div>
  <label className="text-sm text-gray-300 mb-1 block">
    Visibility
  </label>
  <select
    value={newMovie.isVisible}
    onChange={(e) => setNewMovie({ ...newMovie, isVisible: e.target.value })}
    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
    required
  >
    <option value="" disabled>Select visibility</option>
    <option value="true">Visible</option>
    <option value="false">Hidden</option>
  </select>
</div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 text-white rounded-lg px-4 py-2 hover:bg-rose-600 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" size={20} />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <PlusCircle className="mr-2" size={20} />
                  Add Movie
                </div>
              )}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default CreateMovieForm;
