import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Movie() {
  // const { movieId } = useParams();
  // const [movie, setMovie] = useState({});

  // useEffect(() => {
  //   const getMovies = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:8000/api/movies/${movieId}`);
  //       const data = await res.json();
  //       if (data.error) throw new Error(data.error);
  //       setMovie(data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };
  //   if (movieId) {
  //     getMovies();
  //   }
  // }, [movieId]);


  return (
    <div>
    SingleMovie
  </div>
  );
}

export default Movie;
