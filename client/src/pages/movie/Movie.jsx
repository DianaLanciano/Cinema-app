import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/movies/${movieId}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error);
        setMovie(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <div className="text-center text-white mt-20">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="text-center text-white mt-20">Movie not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Movie Poster */}
          <div className="relative h-[300px]">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full rounded-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-rose-400">{movie.title}</h1>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Synopsis</h2>
                <p className="text-gray-400">{movie.synopsis}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-300">Cast</h2>
                <p className="text-gray-400">{movie.actors.join(", ")}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-300">Genre</h2>
                  <p className="text-gray-400">{movie.genre.join(", ")}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-300">Runtime</h2>
                  <p className="text-gray-400">{movie.runtime} minutes</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-300">Rating</h2>
                  <p className="text-gray-400">{movie.rating}/5</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-300">Price</h2>
                  <p className="text-gray-400">${movie.ticketPrice}</p>
                </div>
              </div>

              <button className="w-full bg-rose-500 text-white rounded-lg px-4 py-2 hover:bg-rose-600 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;