// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user_id: string | null; // Thay token thành user_id
  login: (user_id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("user_id")
  );
  const [user_id, setUserId] = useState<string | null>(localStorage.getItem("user_id")); // Thay token thành user_id

  const login = (newUserId: string) => { // Thay newToken thành newUserId
    localStorage.setItem("user_id", newUserId);
    setUserId(newUserId); // Thay setToken thành setUserId
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user_id");
    setUserId(null); // Thay setToken thành setUserId
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user_id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};