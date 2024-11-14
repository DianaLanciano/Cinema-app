import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const user = true;

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40
     transition-all duration-300 border-b border-emerald-800'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex'>
						E-Commerce
					</Link>

          <nav className='flex flex-wrap items-center gap-4'>
            <Link to={"/"} >Home</Link>
            {user && (
              <Link to={"/cart"}>
                <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20}/>
              </Link>
            )}
          </nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;