import { useNavigate } from 'react-router-dom';
import useGetMovies from '../hooks/useGetMovies';
import GenreItem from './GenreItem';
import adventureImage from "../assets/genre/Adventure.jpg";
import documentaryImage from "../assets/genre/Documentary.jpg";
import actionImage from "../assets/genre/Action.jpg";
import dramaImage from "../assets/genre/Drama.jpeg";
import fantasyImage from "../assets/genre/Fantasy.jpg";
import comedyImage from "../assets/genre/Comedy.jpg";
import crimeImage from "../assets/genre/Crime.jpg";


const genres = [
	{ href: "Comedy", name: "Comedy", imageUrl: comedyImage },
	{ href: "Drama", name: "Drama", imageUrl: dramaImage},
	{ href: "Action", name: "Action", imageUrl: actionImage },
	{ href: "Adventure", name: "Adventure", imageUrl: adventureImage },
	{ href: "Fantasy", name: "Fantasy", imageUrl: fantasyImage },
	{ href: "Crime", name: "Crime", imageUrl:  crimeImage},
	{ href: "Documentary", name: "Documentary", imageUrl:  documentaryImage},
];


function Carousel() {
  return (
    <div>
    	<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Movies
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{genres.map((genre) => (
						<GenreItem genre={genre} key={genre.name} />
					))}
				</div>

				{/* {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />} */}
			</div>
		</div>
    </div>
  );
}

export default Carousel;