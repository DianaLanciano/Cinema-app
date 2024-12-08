import { Trash2, Edit } from "lucide-react";

const MovieItem = ({ movie, onDelete, onEdit }) => {
  // const isAdmin = useAuthStore((state) => state.isAdminConnected());

  const isAdmin = true;

  return (
    <div className='relative overflow-hidden h-64 w-full rounded-lg group'>
      <div className='w-full h-full cursor-pointer flex flex-col'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10' />
        <div className='relative h-48'> {/* Container for image with fixed height */}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className='w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105'
            loading='lazy'
          />
        </div>
        <div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
          <h3 className='text-white text-2xl font-bold mb-2'>{movie.title}</h3>
          <p className='text-gray-200 text-sm'>
            Starring: {movie.actors.join(', ')}
          </p>
        </div>

        {isAdmin && (
          <div className="absolute top-2 right-2 space-x-2 z-30">
            <button 
              className="p-2 bg-rose-600 rounded-full hover:bg-rose-700 transition-colors"
              onClick={() => onDelete(movie._id)}
            >
              <Trash2 size={20} className="text-white" />
            </button>
            <button 
              className="p-2 bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors"
              onClick={() => onEdit(movie)}
            >
              <Edit size={20} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieItem;