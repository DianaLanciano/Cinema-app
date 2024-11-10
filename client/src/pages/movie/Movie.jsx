import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/movies/${movieId}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMovie(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (movieId) {
      getMovies();
    }
  }, [movieId]);


  return (
    <div
    className="hero min-h-fit"
    style={{
      backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        <p className="mb-5">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  );
}

export default Movie;
