import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null, 
    firmId: null,
    userToken: null, 
    role: null,
    login: () => {},
    logout: () => {},
    updateId: (id) => {}
})