import "./App.css";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NewItem from "./pages/NewItemPage/newItem";
import Home from "./pages/HomePage/home";
import DropPoints from "./pages/DropOffPointsPage/droppoints";
import Navbar from "./components/Navbar/navbar";
import ItemList from "./pages/ItemListPage/itemlist";
import Dashboard from "./pages/DashboardPage/dashboard";
import LandingPage from "./pages/LandingPage/landing";
import ReportItem from "./pages/ReportItemPage/reportItem";
import { useContext } from "react";
import { AuthContext } from "./context/LoginContext/AuthContext";
import Feedback from "./components/Feedback/feedback";
import { DashboardContextProvider } from "./context/DashboardContext/DashboardContext.tsx";
import { ItemListContextProvider } from "./context/ItemListContext/ItemListContext.tsx";

function App() {
  const location = useLocation();
  const isnotLanding = location.pathname !== "/";
  const isNotForms = location.pathname !== "/newItem" && location.pathname !== "/reportItem";
  const showFeedback = isnotLanding && isNotForms;
  const { showToast, setShowToast} = useContext(AuthContext);
  return (
    <ItemListContextProvider>
      <DashboardContextProvider>
        {showToast && (
          <div className="toast toast-bot toast-end z-30">
            <div className="alert alert-warning">
              <span>
                O seu token de autenticação acabou, volte a fazer login!
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 stroke-current shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => setShowToast(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        )}
        <div>
          {isnotLanding && <Navbar />}
          <div className="flex items-center justify-center">
            {isnotLanding && (
              <div
                tabIndex={0}
                className="mt-5 shadow-xl card bg-primary sm:m-10"
              >
                <Contents />
              </div>
            )}
            {!isnotLanding && <LandingPage />}
          </div>
          {showFeedback && <Feedback />}
        </div>
      </DashboardContextProvider>
    </ItemListContextProvider>
  );
}

function Contents() {
  // Check if the user is logged in (you can use localStorage or another state management solution)
  const { isLoggedIn, id } = useContext(AuthContext);

  if (isLoggedIn && id !== null) {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dropPoints" element={<DropPoints />} />
        <Route path="/findItems" element={<ItemList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newItem" element={<NewItem />} />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dropPoints" element={<DropPoints />} />
        <Route path="/findItems" element={<ItemList />} />
        <Route path="/reportItem" element={<ReportItem />} />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    );
  }
}

export default App;
