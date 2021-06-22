import axios from "axios";

import history from "utils/history";
import { getToken, deleteToken, saveToken } from "utils/auth";
import { API_URL } from "constants/config";
import { Routes } from "constants/routes";

export const REFRESH_TOKEN_ENDPOINT = "/token/refresh";
// Code returned by backend if refresh token is invalid or expired
const TOKEN_EXPIRED_CODE = "token_not_valid";

// Create an Axios instance with custom config
const request = axios.create({
    baseURL: API_URL,
    // if withCredentials: true -> CORS Error somehow. find fix later
    withCredentials: true,
    responseType: "json",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
});

const logout = () => {
    deleteToken();
    history.push(Routes.login);
};

request.interceptors.request.use(
    (config) => {
        if (!config.headers["Authorization"]) {
            const token = getToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token.access}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

request.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Logout
        if (
            // Case: invalid refresh token
            (error.response?.status === 401 &&
                error.response?.data?.code === TOKEN_EXPIRED_CODE &&
                originalRequest.url === REFRESH_TOKEN_ENDPOINT) ||
            // Case: user auth error
            error.response?.data?.code === "user_not_found"
        ) {
            logout();
            return;
        }

        // Refresh access token attempt
        const token = getToken();
        if (
            error.response?.status === 401 &&
            error.response?.data?.code === TOKEN_EXPIRED_CODE
        ) {
            if (token) {
                try {
                    // Call the refresh endpoint to get a new access token
                    const { data } = await request.post<{ access: string }>(
                        REFRESH_TOKEN_ENDPOINT,
                        { refresh: token.refresh }
                    );
                    const newToken: Token = {
                        access: data.access,
                        refresh: token.refresh,
                    };

                    // Save token to session storage
                    saveToken(newToken);

                    // Append new access token to request header
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${data.access}`;

                    // Retry the request again with the new token
                    return request.request(originalRequest);
                } catch {
                    logout();
                    return;
                }
            } else {
                logout();
                return;
            }
        }

        return Promise.reject(error);
    }
);

export default request;
