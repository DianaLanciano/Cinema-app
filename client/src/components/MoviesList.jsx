// components/MoviesList.jsx
import { useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';
import MovieCard from '../components/MovieItem';
import { useNavigate } from "react-router-dom";

const MoviesList = () => {
  const { movies, fetchMovies, loading, deleteMovie } = useMovieStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleDelete = async (movieId) => {
    try {
      await deleteMovie(movieId);
      // The store will automatically update the movies list
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const handleEdit = (movie) => {
    navigate(`/movie/edit/${movie._id}`);
  };

  if (loading) {
    return <div className="text-center text-white">Loading movies...</div>;
  }

  if (loading) {
    return <div className="text-center text-white">Loading movies...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;