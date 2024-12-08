import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";

const Dropdown = () => {
  return (
    <div className="dropdown dropdown-hover ml-2">
      <div tabIndex={0} role="button" className="btn m-1">
        <AlignJustify />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content dropdown-left text-rose-400 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <Link
            to={"/"}
            className="text-red-300 hover:text-rose-400 transition duration-300 ease-in-out"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/movies"}
            className="text-red-300 hover:text-rose-400 transition duration-300 ease-in-out"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to={"/updates"}
            className="text-red-300 hover:text-rose-400 transition duration-300 ease-in-out"
          >
            Get Updates!
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown
