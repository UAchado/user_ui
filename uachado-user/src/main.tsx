import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/LoginContext/AuthContext.tsx";
import MapsProvider from "./context/MapContext/MapsProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MapsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MapsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
