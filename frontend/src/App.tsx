import React, { useState, useCallback } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthContext } from "hooks/useAuth";
import { deleteToken, getToken, saveToken } from "utils/auth";
import { Routes } from "constants/routes";
import session, { SessionStorageKey } from "utils/sessionStorage";

import "./@commitUI/assets/css/index.css";
import "./App.css";
import Pages from "pages";

function App() {
    const [isAuth, setIsAuth] = useState(Boolean(getToken()));

    const login = useCallback((token: Token, next?: Routes) => {
        saveToken(token);
        session.removeItem(SessionStorageKey.sessionTimedOut);
        setIsAuth(true);
    }, []);

    const logout = useCallback(() => {
        deleteToken();
        setIsAuth(false);
    }, []);

    return (
        <ChakraProvider>
            <AuthContext.Provider
                value={{
                    isAuth,
                    login,
                    logout,
                }}
            >
                <Pages />
            </AuthContext.Provider>
        </ChakraProvider>
    );
}

export default App;
