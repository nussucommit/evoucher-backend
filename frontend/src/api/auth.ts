import request from "./request";

// username = nusnet ID
export const login = (data: { username: string; password: string }) => {
    // <Token> is the return type of the { data } from the API call
    return request.post<Token>("/login", data);
};
