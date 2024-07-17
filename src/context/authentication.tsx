"use client";
import { useState, createContext, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { AuthTokens, User } from "@/types";

const BASE_URL = "http://127.0.0.1:8000";
const BASE_FRONTEND_URL = "http://127.0.0.1:3000";

interface AuthWrapperType {
  children: React.ReactNode;
}

export interface AuthContextType {
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  registerUser: (
    first_name: string,
    last_name: string,
    email: string,
    password1: string,
    password2: string
  ) => void;
  activation: (uid: string, token: string) => void;
  getUserInfo: (accessToken: string) => Promise<void>;
  user: User | null;
  setUser: (user: User) => void;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
  // setAuthToken: (token: AuthTokens) => void;
  getUrlGoogle: () => Promise<{ authorization_url: string }>;
  changeUserInfo: (first_name: string, last_name: string) => void;
  // authToken: AuthTokens | null;
  googleLoginUser: (
    code: string,
    state: string
  ) => Promise<{ access: string; refresh: string; user: string }>;
}

const AuthContext = createContext<AuthContextType>({
  loginUser: async () => Promise.resolve(),
  logoutUser: () => {},
  registerUser: async () => Promise.resolve(),
  activation: async () => Promise.resolve(),
  getUserInfo: async () => Promise.resolve(),
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  getUrlGoogle: async () => Promise.resolve({ authorization_url: "" }),
  changeUserInfo: async () => Promise.resolve(),
  googleLoginUser: async () =>
    Promise.resolve({ access: "", refresh: "", user: "" }),
});

export default AuthContext;

export const AuthWrapper = ({ children }: AuthWrapperType) => {
  // const [authToken, setAuthToken] = useState<AuthTokens | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    }
  }, [user]);

  interface DecodedToken {
    pk: number;
    email: string;
    first_name: string;
    last_name: string;
  }

  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const response = await fetch(`${BASE_URL}/api/jwt/verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Token verified:", data);
          return true;
        } else {
          console.error("Token verification failed");
          return false;
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        return false;
      }
    };

    const handleRefreshToken = async (refreshToken: string) => {
      try {
        const response = await fetch(`${BASE_URL}/api/jwt/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.access;
          const newRefreshToken = data.refresh;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);
          console.log("Token refreshed:", data);
          return true;
        } else {
          console.error("Token refresh failed");
          return false;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
      }
    };

    const handleTokenVerification = async () => {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");

      setAccessToken(access);
      setRefreshToken(refresh);

      if (access) {
        const isVerified = await verifyToken(access);
        if (isVerified) {
          setIsAuthenticated(true);
          getUserInfo(access);
        } else if (refresh) {
          console.log("Access token expired, trying to refresh");
          const isRefreshed = await handleRefreshToken(refresh);
          if (isRefreshed) {
            const newAccess = localStorage.getItem("accessToken");
            if (newAccess) {
              const isNewTokenVerified = await verifyToken(newAccess);
              if (isNewTokenVerified) {
                setIsAuthenticated(true);
                const decodedToken = jwtDecode<DecodedToken>(newAccess);
                setUser({
                  pk: decodedToken.pk,
                  email: decodedToken.email,
                  first_name: decodedToken.first_name,
                  last_name: decodedToken.last_name,
                });
              } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setAccessToken(null);
                setRefreshToken(null);
                setIsAuthenticated(false);
                // router.push("/login");
              }
            }
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setAccessToken(null);
            setRefreshToken(null);
            setIsAuthenticated(false);
            // router.push("/login");
          }
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setAccessToken(null);
          setRefreshToken(null);
          setIsAuthenticated(false);
          // router.push("/login");
        }
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
        // router.push("/login");
      }

      setLoading(false);
    };

    handleTokenVerification();
  }, []);

  const getUserInfo = async (accessToken: string) => {
    const response = await fetch(`${BASE_URL}/api/users/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      console.error("Error getting user info");
    }
  };

  const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      const decodedToken = jwtDecode<DecodedToken>(data.access);
      getUserInfo(data.access);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      // localStorage.setItem("user", JSON.stringify(tempUser));
      router.push("/");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  const registerUser = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    re_password: string
  ) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });
    const response = await fetch(`${BASE_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: body,
    });

    const data = await response.json();

    if (response.status === 201) {
      router.push("register/verify-email");
    }
  };

  const activation = async (uid: string, token: string) => {
    const response = await fetch(`${BASE_URL}/api/users/activation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ uid, token }),
    });

    return response;
  };

  const logoutUser = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/");
    const response = await fetch(`${BASE_URL}/api/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  const changeUserInfo = async (first_name: string, last_name: string) => {
    console.log(accessToken);
    const response = await fetch(`${BASE_URL}/api/users/me/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ first_name, last_name }),
    });

    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } else {
    }
  };

  const getUrlGoogle = async () => {
    const url = `${BASE_URL}/api/o/google-oauth2/?redirect_uri=${BASE_FRONTEND_URL}/auth/google`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
    return data;
  };

  const googleLoginUser = async (code: string, state: string) => {
    const url = `${BASE_URL}/api/o/google-oauth2/?state=${encodeURIComponent(
      state
    )}&code=${encodeURIComponent(code)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include", // Ensure cookies are sent with the request
    });

    const data = await response.json();
    // console.log(data);
    // const decodedToken = jwtDecode<DecodedToken>(data.access);
    // console.log({
    //   pk: decodedToken.pk,
    //   email: decodedToken.email,
    //   first_name: decodedToken.first_name,
    //   last_name: decodedToken.last_name,
    // });
    return data;
  };

  const contextData: AuthContextType = {
    loginUser,
    logoutUser,
    registerUser,
    activation,
    getUserInfo,
    user,
    setUser,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    getUrlGoogle,
    // authToken: authToken as AuthTokens,
    // setAuthToken,
    changeUserInfo,
    googleLoginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
