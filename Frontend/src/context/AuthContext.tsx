import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  authToken: string | null;
  userId: string | null;
  login: (authToken: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("auth_token")
  );
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("user_id")
  );

  const login = (newAuthToken: string, newUserId: string) => {
    localStorage.setItem("auth_token", newAuthToken);
    localStorage.setItem("user_id", newUserId);
    setAuthToken(newAuthToken);
    setUserId(newUserId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    setAuthToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authToken, userId, login, logout }}
    >
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