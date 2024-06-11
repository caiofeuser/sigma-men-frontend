"use client";
import { useState, createContext, useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import { AuthTokens, User } from "@/types";

interface AuthWrapperType {
  children: React.ReactNode;
}

export interface AuthContextType {
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  registerUser: (email: string, password1: string, password2: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  setAuthToken: (token: AuthTokens) => void;
  changeUserInfo: (first_name: string, last_name: string, age: number) => void;
  authToken: AuthTokens | null;
  verify: () => void;
  refresh: () => void;
  googleLoginUser: (code: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  loginUser: async () => {},
  logoutUser: () => {},
  registerUser: async () => {},
  user: null,
  setUser: () => {},
  setAuthToken: () => {},
  changeUserInfo: async () => {},
  authToken: null,
  verify: async () => {},
  refresh: async () => {},
  googleLoginUser: async () => {},
});

export default AuthContext;

export const AuthWrapper = ({ children }: AuthWrapperType) => {
  const [authToken, setAuthToken] = useState<AuthTokens | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      setAuthToken(JSON.parse(token));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      const tokenParsed = JSON.parse(token);
      setUser(tokenParsed?.user);
    }
    setLoading(false);
  }, [authToken, loading]);

  const loginUser = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8000/auth_api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(data.user);
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  const registerUser = async (
    email: string,
    password1: string,
    password2: string
  ) => {
    const body = JSON.stringify({
      email,
      password1,
      password2,
    });
    const response = await fetch(
      "http://localhost:8000/auth_api/registration/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.status === 201) {
      router.push("register/verify-email");
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    router.push("/");
  };

  const refresh = async () => {
    if (localStorage.getItem("authTokens")) {
      const body = JSON.stringify({
        refresh: authToken?.refresh,
      });
      const response = await fetch(
        "http://localhost:8000/auth_api/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setAuthToken(data);
      } else {
        router.push("/login");
      }
    }
  };

  const verify = async () => {
    if (localStorage.getItem("authTokens")) {
      const body = JSON.stringify({
        token: localStorage.getItem("authTokens"),
      });
      const response = await fetch(
        "http://localhost:8000/auth_api/token/verify/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log("Token válido");
      } else {
        refresh();
        console.log("Token inválido");
      }
    }
  };

  const changeUserInfo = async (
    first_name: string,
    last_name: string,
    age: number
  ) => {
    const response = await fetch("http://localhost:8000/auth_api/user/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.access}`,
      },
      body: JSON.stringify({ first_name, last_name }),
    });

    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } else {
      verify();
    }
  };

  const getUserInfo = async () => {
    const response = await fetch("http://localhost:8000/auth_api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.access}`,
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      verify();
    }
  };

  const googleLoginUser = async (code: string) => {
    console.log(JSON.stringify({ code }));
    const response = await fetch("http://localhost:8000/auth_api/google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
      setAuthToken(data);
      setUser(data.user);
      localStorage.setItem("authTokens", JSON.stringify(data));
      router.push("/");
    } else {
      alert("Algo deu errado");
    }
  };

  const contextData: AuthContextType = {
    loginUser,
    logoutUser,
    registerUser,
    user,
    setUser,
    authToken: authToken as AuthTokens,
    setAuthToken,
    changeUserInfo,
    refresh,
    verify,
    googleLoginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
