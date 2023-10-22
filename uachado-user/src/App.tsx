import "./App.css";

import generalLogo from "../public/general-icon.png";
import { Link, Route, Routes } from "react-router-dom";
import NewItem from "./components/NewItem/newItem";
import Home from "./components/Home/home";

function App() {
  return (
    <div className="">
      <div className="navbar w- bg-primary rounded-lg">
        <div className="flex-1">
          <img className="w-32 -mr-8" src={generalLogo}></img>
          <Link to="/">
            <a className="btn btn-ghost normal-case text-xl pl-0">UAchado</a>
          </Link>
          <Link to="/newItem">
            <a className="btn btn-ghost normal-case text-xl pl-0">Add Item</a>
          </Link>
        </div>
        <div className="flex-none">
          <Link to="/signIn">
            <button className="btn btn-ghost">Staff Sign-In</button>
          </Link>
        </div>
      </div>
      <div className=" flex justify-center items-center h-screen ">
        <div tabIndex={0} className="mockup-window bg-primary-focus relative">
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
      <Route path="/dropPoints" element={<div>Drop Points</div>} />
      <Route path="/findItems" element={<div>Find Items</div>} />
      <Route path="/signIn" element={<div>Staff Sign-In</div>} />
      <Route path="/newItem" element={<NewItem/>} />
    </Routes>
  );
}

export default App;
