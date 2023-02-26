import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { createUser, deleteUser, readUser } from "@storage/userCRUD";
import { ReactNode, createContext, useEffect, useState } from "react";
export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserData: boolean;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions/", { email, password });
      if (data.user) {
        setUser(data.user);
        createUser(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true);
      setUser({} as UserDTO);
      await deleteUser();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function loadUserData() {
    try {
      const loggedInUser = await readUser();
      if (loggedInUser) {
        setUser(loggedInUser);
        setIsLoadingUserData(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
