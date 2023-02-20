import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    name: "sam",
    avatar: "aaaaaaa.png",
    email: "samuel@gmail.com",
    id: "25",
    password: "1234567",
    tel: "84987055995",
  });

  function signIn(email: string, password: string) {
    setUser({
      name: "samu",
      email,
      password,
      avatar: "foto.png",
      id: "",
      tel: "84",
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
