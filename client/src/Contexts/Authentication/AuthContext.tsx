import React, { createContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { AuthContextType } from "../../Types/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: users, isLoading, isError } = useQuery("users", fetchUser, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  async function fetchUser() {
    const response = await axios.get("/api/users");
    return response.data;
  }

  return (
    <AuthContext.Provider value={{ users, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};
