import React, { useState, useCallback } from "react";

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
        <AuthContext.Provider
            value={{
                isAuth,
                login,
                logout,
            }}
        >
            <Pages />
        </AuthContext.Provider>
    );
}

export default App;
