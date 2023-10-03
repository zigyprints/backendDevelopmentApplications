import axios from "axios";
import { createContext, useEffect, useState } from "react";

type AuthUser = {
  name: string,
  email: string,
  _id: string
}

type ContextProps = {
  children: React.ReactNode
}

export type UserContextData = {
  User: any,
  setUser: any
}


export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: ContextProps) {
  const [User, setUser] = useState<AuthUser | null>(null);
  const [ready, setready] = useState(false);


  useEffect(() => {
    const LocalUser = localStorage.getItem("User")
    if (LocalUser) {
      setUser(JSON.parse(LocalUser))
    }
  }, [])


  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
}