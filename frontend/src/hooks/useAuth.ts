import { createContext, useContext } from "react";
import { Routes } from "constants/routes";

const defaultValue: {
    isAuth: boolean;
    login: (token: Token, next?: Routes) => void;
    logout: () => void;
} = {
    isAuth: false,
    login: () => undefined,
    logout: () => undefined,
};

export const AuthContext = createContext(defaultValue);

const useAuth = () => useContext(AuthContext);

export default useAuth;
