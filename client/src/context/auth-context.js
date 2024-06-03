import { createContext } from "react";

export const AuthContext = createContext({
    admin: false,
    isLoggedIn: false,
    userId: null,
    firmId: null,
    userToken: null,
    login: () => { },
    logout: () => { },

    refresh: false, // Add a refresh flag
    handleRefresh: () => { }, // Add a function to handle refresh

})