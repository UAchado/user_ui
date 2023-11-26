import generalLogo from "../../../public/general-icon.png";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/LoginContext/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const { username } = useContext(AuthContext);

  const [showGreeting, setShowGreeting] = useState(false);
  

  const handleLogout = () => {
    logout();
  };

  const toggleGreeting = () => {
    setShowGreeting(!showGreeting);
  };

  return (
    <div
      className="rounded-lg navbar bg-primary"
      style={{ position: "relative", zIndex: 20, width: "100%" }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={20} className="btn btn-ghost btn-circle">
            <i className="fas fa-bars"></i>{" "}
            {/* Example: Using Font Awesome icons */}
          </label>
          <ul
            tabIndex={20}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2 "
          >
            <li>
              <Link
                to="/newItem"
                className="text-xl normal-case btn btn-ghost rounded-box w-full justify-start items-center"
              >
                Adicionar Item
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-xl normal-case btn btn-ghost rounded-box w-full justify-start items-center mt-1"
              >
                DashBoard
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <img className="w-32 -mr-8" src={generalLogo}></img>
        </Link>
      </div>
      <div className="navbar-end">
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={toggleGreeting}
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <i className="fas fa-user"></i> {/* User icon */}
              </div>
            </button>
            {showGreeting && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="p-2">
                  <p className="text-gray-800 text-sm">
                    Hello, {username}{/* Replace with actual username */}
                  </p>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="button w-full text-cent text-gray-800 hover:bg-gray-200 p-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {!isLoggedIn && (
          <div className="relative">
            <Link to="/login">
              <button onClick={() => {}} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <i className="fas fa-user"></i> {/* User icon */}
                </div>
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex-none"></div>
    </div>
  );
};

export default Navbar;
