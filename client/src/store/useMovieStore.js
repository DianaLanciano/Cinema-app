import { create } from "zustand";
import toast from "react-hot-toast";

const useMovieStore = create((set, get) => ({
  // State
  movies: [],
  searchResults: [],
  currentGenre: null,
  loading: false,
  error: null,

  // Actions
  createMovie: async (movieData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:8000/api/movies/addMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(movieData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create movie');
      }

      set((state) => ({
        movies: [...state.movies, data],
        loading: false
      }));

      toast.success("Movie created successfully!");
      return data;
      
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },

  // Fetch all movies
  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:8000/api/movies");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch movies');
      }

      set({ 
        movies: data, 
        searchResults: [], // Clear search results
        currentGenre: null, // Clear current genre
        loading: false 
       });
      return data;
      
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },

  updateMovie: async (movieId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8000/api/movies/${movieId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',  // Important!
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update movie');
      }

      set((state) => ({
        movies: state.movies.map((movie) =>
          movie._id === movieId ? data : movie
        ),
        loading: false
      }));
      return data;
      
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },

  deleteMovie: async (movieId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8000/api/movies/${movieId}`, {
        credentials: 'include',  // Important!
        method: "DELETE",
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete movie');
      }

      set((state) => ({
        movies: state.movies.filter((movie) => movie._id !== movieId),
        loading: false
      }));

      toast.success("Movie deleted successfully!");
      
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },
  // Helper function to get movie by ID
  getMovieById: (movieId) => {
    const state = get();
    return state.movies.find((movie) => movie._id === movieId);
  },

  // Search movies with criteria
  searchMoviesByGenre: async (searchCriteria) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:8000/api/movies", {  
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ searchCriteria })
      });
      
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      set({ 
        movies: data,
        searchResults: [], // Clear search results
        currentGenre: searchCriteria.genre,
        loading: false 
      });

      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },

  // Search from search input
  searchInput: async (searchTerm) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:8000/api/movies/search", {  
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ searchTerm })
      });
      
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      set({ 
        searchResults: data,
        loading: false 
      });

      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },

  clearSearch: () => {
    set({ searchResults: [] });
  },

}));

export default useMovieStore;