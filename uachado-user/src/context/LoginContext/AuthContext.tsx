import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  role: string;
  login: (username: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: "",
  role: "",
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

  const [role, setRole] = useState<string>(
    localStorage.getItem("role") || ""
  );
  

  const login = (newUsername: string, role: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", newUsername);
    localStorage.setItem("role", role);
    setIsLoggedIn(true);
    setUsername(newUsername);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
  };



  const contextValue: AuthContextType = {
    username,
    role,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
