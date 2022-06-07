import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { api } from "../config/api";

export type User = {
  email: string;
  isAdmin: boolean;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user?: User;
  isAuthenticated: boolean;
};

type TokenAuthDecode = {
  email: string;
  isAdmin: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token-todo");

    if (token) {
      handleToken(token);
    }
  }, []);

  async function signOut() {
    setIsAuthenticated(false);
    localStorage.removeItem("token-todo");
    navigate("/");
  }

  async function handleToken(token: string) {
    const { email, isAdmin }: TokenAuthDecode = jwtDecode(token);
    console.log(email, isAdmin);

    setUser({ email, isAdmin });
    setIsAuthenticated(true);
  }

  async function signOn({ email, password }: SignInCredentials) {
    await api
      .post("/users", {
        email,
        password,
      })
      .then(async () => {
        signIn({ email, password });
      })
      .catch((error) => {
        return toast({
          title: `${error.response?.data?.message || "Server error"}`,
          status: "error",
          isClosable: true,
        });
      });
  }

  async function signIn({ email, password }: SignInCredentials) {
    await api
      .post("/sessions", {
        email,
        password,
      })
      .then(async (response) => {
        console.log(response.data);
        localStorage.setItem("token-todo", response.data.token);
        handleToken(response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        return toast({
          title: `${error.response?.data?.message || "Server error"}`,
          status: "error",
          isClosable: true,
        });
      });
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signOn, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
