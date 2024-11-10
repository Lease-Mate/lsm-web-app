"use client";

import { User } from "@/lib/types";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderProps = {
  currentUser: User | null;
  children: ReactNode;
};

export default function AuthContextProvider({ children, currentUser }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(currentUser);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
}
