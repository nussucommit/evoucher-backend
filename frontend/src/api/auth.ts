import request from "./request";

// username = nusnet ID
export const login = (data: { username: string; password: string }) => {
    // <Token> is the return type of the { data } from the API call
    return request.post<Token>("/login", data);
};

export const register = (data: {
    username: string;
    password: string;
    name: string;
    year: number;
    faculty1: string;
    faculty2?: string;
}) => {
    return request.post("/register", data);
};
