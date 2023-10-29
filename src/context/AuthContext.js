import { createContext, useEffect, useState } from "react";
import { userObserver } from "../helpers/functions";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        // setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
        userObserver(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;