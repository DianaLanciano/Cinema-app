import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Movie from "./pages/movie/Movie";
import { Toaster } from "react-hot-toast";
import Movies from "./pages/movies/Movies";
import Navbar from "./components/Navbar";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div 
          className='absolute top-0 left-1/2 -translate-x-1/2 
          w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(254,180,157,0.8)_0%,rgba(10,34,60,0.8)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>
      <div className="relative z-50 pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Toaster />
      </div>
     
    </div>
  );
}

export default App;
