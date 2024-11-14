import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  AlignJustify,
} from "lucide-react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const user = true;
  const isAdmin = true;

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-rose-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
			<SearchInput />
          <Link
            to="/"
            className="text-2xl font-bold text-rose-400 items-center space-x-2 flex"
          >
            CinemaFun
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            {user && (
              <Link
                to={"/cart"}
                className="text-gray-300 hover:text-rose-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-rose-400"
                  size={20}
                />
                <span className="hidden sm:inline">3</span>
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-rose-700 hover:bg-rose-600 text-white px-3 py-1 rounded-md font-medium
			 transition duration-300 ease-in-out flex items-center"
                to={"/"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/"}
                  className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
            <div className="dropdown dropdown-hover ml-2">
              <div tabIndex={0} role="button" className="btn m-1">
                <AlignJustify />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content dropdown-left text-rose-400 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a>
                    <Link
                      to={"/"}
                      className="text-red-300 hover:text-rose-400 transition duration-300 ease-in-out"
                    >
                      Home
                    </Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link
                      to={"/"}
                      className="text-red-300 hover:text-rose-400 transition duration-300 ease-in-out"
                    >
                      Movies
                    </Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link
                      to={"/"}
                      className="text-red-300 hover:text-rose-400 transition duration-300 ease-in-out"
                    >
                      Get Updates!
                    </Link>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
