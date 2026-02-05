import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { toast } from "react-toastify";
import { RiShoppingCartLine } from "react-icons/ri";
import Logo from "../Assets/Logo.png";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.info("You have been logged out.");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center py-1">
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-16 transition-transform duration-300 group-hover:scale-105"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600 hidden sm:block">
            MyShop
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden md:block text-gray-700 font-medium">
            Hi, {user?.name || "Guest"}
          </span>

          <button
            onClick={() => navigate("/cart")}
            className="relative bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-all"
          >
            <RiShoppingCartLine size={22} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {items.length}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
