import { useParams } from 'react-router-dom';

function Movie() {
    const { movieId } = useParams();
    
  return (
    <div>
      Movie Details for ID: {movieId}
    </div>
  )
}

export default Movie
