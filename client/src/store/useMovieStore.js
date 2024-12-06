import { create } from "zustand";

/*
Actions:
Fetch movies from the server.
Add a new movie.
Delete a movie.
Update movie details (optional).
*/

const useMovieStore = create((set) => ({
    // State
    movies: [], // Stores the list of movies
    loading: false, // Indicates API request in progress
    error: null, // Error state
  
    // Actions
    fetchMovies: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("http://localhost:8000/api/movies");
        const data = await response.json();
        set({ movies: data.movies, loading: false });
      } catch (error) {
        set({ error: "Failed to fetch movies", loading: false });
      }
    },
  
    addMovie: async (newMovie) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("http://localhost:8000/api/movies/addMovie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMovie),
        });
        const addedMovie = await response.json();
        set((state) => ({
          movies: [...state.movies, addedMovie],
          loading: false,
        }));
      } catch (error) {
        set({ error: "Failed to add movie", loading: false });
      }
    },
  
    deleteMovie: async (movieId) => {
      set({ loading: true, error: null });
      try {
        await fetch(`http://localhost:8000/api/movies/${movieId}`, {
          method: "DELETE",
        });
        set((state) => ({
          movies: state.movies.filter((movie) => movie._id !== movieId),
          loading: false,
        }));
      } catch (error) {
        set({ error: "Failed to delete movie", loading: false });
      }
    },
  
    updateMovie: async (movieId, updatedData) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`http://localhost:8000/api/movies/${movieId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
        const updatedMovie = await response.json();
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie._id === movieId ? updatedMovie : movie
          ),
          loading: false,
        }));
      } catch (error) {
        set({ error: "Failed to update movie", loading: false });
      }
    },
  }));


  export default useMovieStore;