import { createContext, useEffect, useState } from "react";
import { ContextProps } from "../utils/types";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextValues = {
  isAuthenticated: boolean,
  signIn: (credentials: SignInProps) => Promise<void>,
  user: UserProps,
  loading: boolean,
  loadingAuth: boolean,
  signOut: () => Promise<void>
}

type UserProps = {
  id: string,
  name: string,
  email: string,
  token: string
}

type SignInProps = {
  email: string,
  password: string
}

const AuthContext = createContext({} as AuthContextValues);

const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
    id: "",
    token: ""
  });

  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user.name;

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await AsyncStorage.getItem("@pizzaria");
      const hasUser: UserProps = JSON.parse(userInfo || "{}")

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`;
        setUser(hasUser);
      }
      
      setLoading(false);

    }

    getUser()
  }, [])

  const signIn = async ({ email, password }: SignInProps) => {
    setLoadingAuth(true);
    try {
      const res = await api.post("/login", {
        email,
        password
      });
      setUser(res.data);
      await AsyncStorage.setItem("@pizzaria", JSON.stringify(res.data));
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      setLoadingAuth(false);
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
  }

  const signOut = async() => {
    await AsyncStorage.clear();
    setUser({
      email: "",
      id: "",
      name: "",
      token: ""
    })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, loading, loadingAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }