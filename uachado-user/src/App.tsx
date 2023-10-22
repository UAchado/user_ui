import "./App.css";

import { Route, Routes } from "react-router-dom";
import NewItem from "./components/NewItem/newItem";
import Home from "./components/Home/home";
import DropPoints from "./components/DropPoints/droppoints";
import Navbar from "./components/Navbar/navbar";

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div tabIndex={0} className="mockup-window bg-primary-focus">
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
      <Route path="/findItems" element={<div>Find Items</div>} />
      <Route path="/signIn" element={<div>Staff Sign-In</div>} />
      <Route path="/newItem" element={<NewItem/>} />
    </Routes>
  );
}

export default App;
