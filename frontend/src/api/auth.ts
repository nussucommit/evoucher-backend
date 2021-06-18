import request from "./request";

export const login = (data: { nusnet: string; password: string }) => {
    // <Token> is the return type of the { data } from the API call
    request.post<Token>("/auth/login/", data);
};
