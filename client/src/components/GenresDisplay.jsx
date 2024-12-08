import { useNavigate } from 'react-router-dom';
import GenreItem from './GenreItem';
import adventureImage from "../assets/genre/Adventure.jpg";
import documentaryImage from "../assets/genre/Documentary.jpg";
import actionImage from "../assets/genre/Action.jpg";
import dramaImage from "../assets/genre/Drama.jpeg";
import fantasyImage from "../assets/genre/Fantasy.jpg";
import comedyImage from "../assets/genre/Comedy.jpg";
import crimeImage from "../assets/genre/Crime.jpg";


const genres = [
	{ name: "Comedy", imageUrl: comedyImage },
	{ name: "Drama", imageUrl: dramaImage},
	{ name: "Action", imageUrl: actionImage },
	{ name: "Adventure", imageUrl: adventureImage },
	{ name: "Fantasy", imageUrl: fantasyImage },
	{ name: "Crime", imageUrl:  crimeImage},
	{ name: "Documentary", imageUrl:  documentaryImage},
];


function GenresDisplay() {

	const navigate = useNavigate();

	const handleClick = (genre) => {
		navigate(`/movies/${genre}`);
	};

  return (
    <div>
    	<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Movies
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest movies
				</p>

				<div 
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
				>
					{genres.map((genre) => (
						<GenreItem genre={genre} key={genre.name} onClick={handleClick} />
					))}
				</div>
			</div>
		</div>
    </div>
  );
}

export default GenresDisplay;