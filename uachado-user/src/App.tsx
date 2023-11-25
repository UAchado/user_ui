import "./App.css";
import { Route, Routes } from "react-router-dom";
import NewItem from "./pages/NewItemPage/newItem";
import Home from "./pages/HomePage/home";
import DropPoints from "./pages/DropOffPointsPage/droppoints";
import Navbar from "./components/Navbar/navbar";
import ItemList from "./pages/ItemListPage/itemlist";
import Dashboard from "./pages/DashboardPage/dashboard";
import Login from "./pages/LoginPage/login";


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
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dropPoints" element={<DropPoints/> } />
      <Route path="/findItems" element={<ItemList />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/newItem" element={<NewItem />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Not Found!</h1>} />
    </Routes>
  );
}

export default App;
