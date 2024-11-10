import { useNavigate } from 'react-router-dom';
import useGetMovies from '../hooks/useGetMovies';


function Carousel() {

  const navigate = useNavigate();
  const { movies } = useGetMovies();

  function handleClick(movie) {
    navigate(`/movie/${movie._id}`);
  }

  return (
    <div className="carousel rounded-box mt-16">
      {movies.map((movie) => (
        <div key={movie._id} className="carousel-item">
          <img
            src="https://m.media-amazon.com/images/I/81DQPNk94RL._AC_UF894,1000_QL80_.jpg"
            alt="Image"
            onClick={() => handleClick(movie)} // Pass the movie ID as an argument
            className="w-72 h-100 object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default Carousel;