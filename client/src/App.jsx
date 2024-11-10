import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Movie from "./pages/movie/Movie";
import { Toaster } from "react-hot-toast";
import Movies from "./pages/movies/Movies";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center border-separate">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
