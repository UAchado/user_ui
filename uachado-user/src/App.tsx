// @ts-nocheck
import "./App.css";
import { useLocation } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import NewItem from "./pages/NewItemPage/newItem";
import Home from "./pages/HomePage/home";
import DropPoints from "./pages/DropOffPointsPage/droppoints";
import Navbar from "./components/Navbar/navbar";
import ItemList from "./pages/ItemListPage/itemlist";
import Dashboard from "./pages/DashboardPage/dashboard";
import Login from "./pages/LoginPage/login";
import LandingPage from "./pages/LandingPage/landing";
import ReportItem from "./pages/ReportItemPage/reportItem";
import { useContext } from "react";
import { AuthContext } from "./context/LoginContext/AuthContext";
import Feedback from "./components/Feedback/feedback";


function App() {

  const location = useLocation();
  const isnotLanding = location.pathname !== "/";
  return (
    <div className="">
      {isnotLanding && <Navbar />
      }
      <div className="flex items-center justify-center">
        {isnotLanding && 
        <div tabIndex={0} className="mt-5 shadow-xl card bg-primary sm:m-10">
          <Contents />
        </div>
        }
        {!isnotLanding && <LandingPage/>}
      </div>
      {isnotLanding && <Feedback/>}
    </div>
  );
}

function Contents() {
  // Check if the user is logged in (you can use localStorage or another state management solution)
  const { isLoggedIn } = useContext(AuthContext);
  const { role } = useContext(AuthContext);

  if (isLoggedIn && role === "admin") {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dropPoints" element={<DropPoints />} />
        <Route path="/findItems" element={<ItemList />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/newItem"
          element={<NewItem />}
        />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    );
  }
  else if (isLoggedIn && role === "user") {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dropPoints" element={<DropPoints />} />
        <Route path="/findItems" element={<ItemList />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/reportItem"
          element={<ReportItem />}
        />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    );
  }
  else {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dropPoints" element={<DropPoints />} />
        <Route path="/findItems" element={<ItemList />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    );
  }
}

export default App;
