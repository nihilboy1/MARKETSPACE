import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  localGetToken,
  localRemoveToken,
  localStoreToken,
} from "@storage/tokenStorage";
import {
  localGetUser,
  localRemoveUser,
  localStoreUser,
} from "@storage/userStorage";
import { ReactNode, createContext, useEffect, useState } from "react";
export type AuthContextDataProps = {
  userState: UserDTO;
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
  const [userState, setUserState] = useState({} as UserDTO);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  async function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUserState(user);
  }

  async function localStoreUserAndToken(user: UserDTO, token: string) {
    try {
      setIsLoadingUserData(true);
      await localStoreUser(user);
      await localStoreToken(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions/", { email, password });
      if (data.user && data.token) {
        console.log(data.token);
        await localStoreUserAndToken(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true);
      setUserState({} as UserDTO);
      await localRemoveUser();
      await localRemoveToken();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserData(true);
      const loggedInUser = await localGetUser();
      const token = await localGetToken();
      if (loggedInUser && token) {
        userAndTokenUpdate(loggedInUser, token);
        console.log(token);
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
        userState,
        signIn,
        signOut,
        isLoadingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
