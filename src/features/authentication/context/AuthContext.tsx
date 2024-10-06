import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useState } from "react";

type AuthContextState = {
  user: User | null;
  setupUser: (supabaseUser: User) => void;
};

export const AuthContext = createContext<AuthContextState | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const setupUser = (supabaseUser: User) => {
    setUser(supabaseUser);
  };

  return (
    <AuthContext.Provider value={{ user, setupUser }}>
      {children}
    </AuthContext.Provider>
  );
};
