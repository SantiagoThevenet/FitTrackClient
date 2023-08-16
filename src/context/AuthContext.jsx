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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginAuth = async (user) => {
    try {
      console.log("Ver user =>:", user);
      const res = await loginRequest(user);
      console.log(res)
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };
  const registerAuth = async (user) => {
    try {
      const res = await regisetRequest(user);
      console.log(res)
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

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
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
