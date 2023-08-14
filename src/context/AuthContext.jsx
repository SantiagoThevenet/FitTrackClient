import { createContext, useContext } from "react"
import { loginRequest } from "../api/auth"

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext())
    
    if (!context) throw new Error("useAuth must be used within an AuthProvider")

    return context
}

export const AuthProvider = ({children}) => {
  
  const loginAuth = () => {
    loginRequest
  }
  const registerAuth = () => {

  }
  
  return (
    <AuthContext.Provider
        value={{
            loginAuth,
            registerAuth
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}