import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    firmId: null,
    userToken: null,
    role: null,
    login: () => { },
    logout: () => { },
    updateId: () => { },
    refresh: false, // Add a refresh flag
    handleRefresh: () => { }, // Add a function to handle refresh

    customers: [],
    setCustomer: () => { },
})