// stores/useMovieStore.js
import { create } from "zustand";
import toast from "react-hot-toast";

const useMovieStore = create((set, get) => ({
  // State
  movies: [],
  loading: false,
  error: null,

  // Actions
  createMovie: async (movieData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:8000/api/movies/addMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:8000/api/movies");
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch movies');
      }

      set({ movies: data, loading: false });
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
  searchMovies: async (searchCriteria) => {
    set({ loading: true, error: null });
    try {
      console.log('Searching with criteria:', searchCriteria); // Add debug log
      
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
        loading: false 
      });

      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
      throw error;
    }
  },


}));

export default useMovieStore;