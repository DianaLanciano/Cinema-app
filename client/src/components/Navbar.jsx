import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import Dropdown from "./Dropdown";
import useAuthStore from '../store/useAuthStore';
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const isAdminConnected = useAuthStore((state) => state.isAdminConnected());
  const user = false;
  const { logout } = useLogout();

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md z-40 transition-all duration-300">
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      
      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>

      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500 hover:from-rose-500 hover:to-purple-600 transition-all duration-300"
          >
            CinemaFun
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <SearchInput />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {user && (
              <Link
                to="/cart"
                className="relative group"
              >
                <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-rose-400 transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            )}

            {isAdminConnected ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white flex items-center space-x-2 transition-all duration-300"
                >
                  <Lock className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded-full border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white flex items-center space-x-2 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/updates"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white flex items-center space-x-2 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Updates</span>
                </Link>

                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white flex items-center space-x-2 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              </div>
            )}

            <Dropdown />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;