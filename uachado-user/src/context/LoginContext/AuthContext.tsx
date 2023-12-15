import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  name: string;
  id: number | null;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  login: (username: string, id: number, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: false,
  name: "",
  id: null,
  showToast: false,
  setShowToast: () => {},
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const pointsBaseUrl = import.meta.env.VITE_POINTS_URL;
  const COGNITO_TOKEN_ENDPOINT: string = import.meta.env
    .VITE_COGNITO_TOKEN_ENDPOINT;
  const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;
  const CLIENT_SECRET: string = import.meta.env.VITE_CLIENT_SECRET;
  const [showToast, setShowToast] = useState<boolean>(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [name, setName] = useState<string>(localStorage.getItem("name") || "");

  const [id, setId] = useState<number | null>(
    parseInt(localStorage.getItem("id") || "") || null
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );

  const checkToken = async (token: string) => {
    try {
      const response = await axios.get(pointsBaseUrl + "access", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  };

  const fetchTokens = async (code: string) => {
    let my_token = null;
    if (
      COGNITO_TOKEN_ENDPOINT === null ||
      CLIENT_ID === null ||
      REDIRECT_URI === null ||
      CLIENT_SECRET === null ||
      code === null
    )
      return;

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", CLIENT_ID);
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("client_secret", CLIENT_SECRET);

    try {
      if (COGNITO_TOKEN_ENDPOINT === null || params.size !== 5) return;

      const response = await axios.post(COGNITO_TOKEN_ENDPOINT, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      my_token = await response.data.access_token;
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }

    try {
      if (my_token === null) return;
      const access = await axios.get(pointsBaseUrl + "access", {
        headers: { Authorization: `Bearer ${my_token}` },
      });

      login(access.data.name, access.data.point_id, my_token);
    } catch (error) {
      console.error("Error getting the access data: ", error);
    }
    // Handle tokens here (e.g., store them in local storage, state management, etc.)
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      // If there's a code in the URL, try fetching tokens
      if (code) {
        await fetchTokens(code);
        navigate("/home");
      } else if (token) {
        // If there's no code but we have a token, check its validity
        const isValid = await checkToken(token);
        if (!isValid) {
          setShowToast(true);
          logout();
        }
      }
    };

    fetchData();

    // If you want to check the token validity periodically, set up an interval
    const interval = setInterval(() => {
      console.log("Checking token validity...");
      const token = localStorage.getItem("token");
      if (token) {
        checkToken(token).then((isValid) => {
          console.log("Token is valid:", isValid);
          if (!isValid) {
            setShowToast(true);
            logout();
          }
        });
      }
    }, 1000); // 1 second

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [token]); // Dependencies should be the state variables the effect relies on

  const login = (name: string, id: number, token: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("id", id.toString());
    setToken(token);
    setIsLoggedIn(true);
    setName(name);
    setId(id);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setName("");
    setId(null);
  };

  const contextValue: AuthContextType = {
    token,
    name,
    id,
    isLoggedIn,
    showToast,
    setShowToast,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
