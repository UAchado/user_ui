// @ts-nocheck
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import NewItem from "./pages/NewItemPage/newItem";
import Home from "./pages/HomePage/home";
import DropPoints from "./pages/DropOffPointsPage/droppoints";
import Navbar from "./components/Navbar/navbar";
import ItemList from "./pages/ItemListPage/itemlist";
import Dashboard from "./pages/DashboardPage/dashboard";
import Login from "./pages/LoginPage/login";
import ReportItem from "./pages/ReportItemPage/reportItem";
import { useContext } from "react";
import { AuthContext } from "./context/LoginContext/AuthContext";


function App() {
  return (
    <div className="">
      <Navbar />
      <div className="flex items-center justify-center">
        <div tabIndex={0} className="card shadow-xl bg-primary mt-5 sm:m-10">
          <Contents />
        </div>
      </div>
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
        <Route path="/" element={<Home />} />
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
        <Route path="/" element={<Home />} />
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
