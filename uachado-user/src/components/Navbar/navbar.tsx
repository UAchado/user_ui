import generalLogo from "../../../public/general-icon.png";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';


const Navbar = () => {
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 bg-secondary space-y-2 "
          >
            <li>
              <Link
                to="/newItem"
                className="text-xl normal-case btn btn-ghost rounded-box w-52 justify-start items-center w-full"
              >
                Add Item
              </Link>
            </li>
            <li>
              <Link
                to="/newItem"
                className="text-xl normal-case btn btn-ghost rounded-box w-52 justify-start items-center w-full mt-1"
              >
                Add Item
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
        <Link to="/dashboard">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <i className="fas fa-bell"></i>{" "}
              {/* Example: Using Font Awesome icons */}
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </Link>
      </div>

      <div className="flex-none"></div>
    </div>
  );
};

export default Navbar;
