import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: "",
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [username, setUsername] = useState<string>(
    localStorage.getItem("username") || ""
  );
  

  const login = (newUsername: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", newUsername);
    setIsLoggedIn(true);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };



  const contextValue: AuthContextType = {
    username,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
