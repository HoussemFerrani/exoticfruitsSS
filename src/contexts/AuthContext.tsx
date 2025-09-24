"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isEmailVerified?: boolean;
}

interface AuthResponse {
  user: User;
  token?: string;
  requiresVerification?: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  isLoading: boolean;
  csrfToken: string;
  completeEmailVerification: (userData: User, token?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfToken] = useState(() => Math.random().toString(36).substring(2));

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // If email verification is required, don't set user state yet
    if (data.requiresVerification) {
      return data as AuthResponse;
    }

    // Normal login flow
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
    }

    return data as AuthResponse;
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Signup failed");
    }

    // Signup now requires email verification, so don't set user state yet
    return data as AuthResponse;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const completeEmailVerification = (userData: User, token?: string) => {
    // After email verification, log the user in automatically
    if (token) {
      localStorage.setItem("token", token);
    }
    setUser(userData);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    csrfToken,
    completeEmailVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
