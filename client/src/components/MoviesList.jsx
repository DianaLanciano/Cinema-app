import { useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';
import MovieCard from '../components/MovieItem';
import { useNavigate, useParams } from "react-router-dom";

const MoviesList = () => {
  const { 
    movies, 
    searchResults, 
    currentGenre, 
    deleteMovie, 
    loading, 
    fetchMovies 
  } = useMovieStore();
 

  const navigate = useNavigate();
  const { genre } = useParams(); // Get genre from URL if it exists

useEffect(() => {
    if (!genre && !searchResults.length) {
      fetchMovies();
    }
  }, [fetchMovies, genre, searchResults.length]);

  const displayMovies = searchResults.length > 0 ? searchResults : movies;

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

  return (
    <div className="container mx-auto px-4 py-8">
    {currentGenre && !searchResults.length && (
      <h2 className="text-2xl font-bold text-rose-400 mb-6">
        {currentGenre} Movies
      </h2>
    )}
    {searchResults.length > 0 && (
      <h2 className="text-2xl font-bold text-rose-400 mb-6">
        Search Results
      </h2>
    )}
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {displayMovies.map((movie) => (
        <MovieCard 
          key={movie._id} 
          movie={movie} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
        />
      ))}
    </div>
  </div>
  );
};

export default MoviesList;