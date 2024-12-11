import { useState, useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchInput, fetchMovies } = useMovieStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSearch = async () => {
        try {
          if (searchTerm.length >= 3) {
            await searchInput(searchTerm);
            navigate('/movies');
          } 
        } catch (error) {
          console.error('Search error:', error);
        }
      }

    // Debounce the search to avoid too many requests
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, navigate, searchInput, fetchMovies]);

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input 
          type="text" 
          className="grow text-rose-400" 
          placeholder="Search movies or actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          minLength={3}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
};

export default SearchInput;