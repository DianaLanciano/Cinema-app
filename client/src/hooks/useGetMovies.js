import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/movies/");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMovies(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getMovies();
  }, []); // Empty dependency array ensures this effect runs only once

  return { movies };
};

export default useGetMovies;
