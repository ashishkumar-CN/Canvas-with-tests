import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from "@/State/Auth/ActionType";

const API_BASE = "http://localhost:8081/api/auth";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      const data = res.data;
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      }
      return { error: null };
    } catch (err: any) {
      return { error: err.response?.data?.message || "Invalid credentials" };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mapping 'fullName' to 'name' for your Java @RequestBody RegisterRequest
      const res = await axios.post(`${API_BASE}/register`, { name, email, password });
      const data = res.data;
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
      }
      return { error: null };
    } catch (err: any) {
      return { error: err.response?.data?.message || "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;