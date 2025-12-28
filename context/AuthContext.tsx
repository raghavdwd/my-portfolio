import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthState } from "../types";

// defining context type with auth state and methods
interface AuthContextType extends AuthState {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// storage key for JWT token persistence
const TOKEN_KEY = "short_url_token";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // initializing state synchronously from localStorage to prevent flash redirect
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      return {
        isAuthenticated: true,
        token: storedToken,
      };
    }
    return {
      isAuthenticated: false,
      token: null,
    };
  });

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setAuthState({
      isAuthenticated: true,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for easy access to auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
