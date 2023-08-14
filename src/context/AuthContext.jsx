import { createContext, useContext } from "react";
import { loginRequest, regisetRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const loginAuth = async (user) => {
    try {
      console.log("Ver user =>:", user);
      const res = await loginRequest(user);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const registerAuth = async (user) => {
    try {
      const res = await regisetRequest(user);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginAuth,
        registerAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
