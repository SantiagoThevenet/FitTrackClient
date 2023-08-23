import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, regisetRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginAuth = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const registerAuth = async (user) => {
    try {
      const res = await regisetRequest(user);
      setIsAuthenticated(true);
      setUser(res.data)
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    Cookies.remove("token")
    setIsAuthenticated(false)
    setUser(false)
  }

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data)
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginAuth,
        registerAuth,
        user,
        isAuthenticated,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
