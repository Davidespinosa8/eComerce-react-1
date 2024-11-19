import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserLogged } from "../../redux/slices/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogged = useSelector((state) => state.user.userLogged);

  const sessionClose = () => {
    dispatch(clearUserLogged());
    navigate("/");
  };

  return (
    <header className="bg-white border-b shadow-sm pt-14">
      {/* Main Navigation */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/src/assets/Logo/carrito-de-compras.png" // Cambia esto por tu logo
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="text-2xl font-semibold text-gray-800">
            Ecommerce React
          </span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          {userLogged ? (
            <>
              <span className="text-gray-600">Welcome, {userLogged.name}</span>
              <button
                onClick={sessionClose}
                className="text-gray-800 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-gray-800 hover:text-blue-600 transition"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-gray-800 hover:text-blue-600 transition"
              >
                Register
              </a>
            </>
          )}
        </nav>

        {/* Theme Switcher */}
        <button
          className="hidden md:inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-200"
          aria-label="Toggle Theme"
        >
          {/* Puedes reemplazar esto con tu funcionalidad de tema */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.485-8.485h-1M4.515 12h-1M16.95 7.05l-.707.707m-8.486 8.486-.707.707M7.05 7.05l.707.707m8.486 8.486.707.707"
            />
          </svg>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-200"
          aria-label="Open Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
