import { REACT_APP_API_URL } from "env";

export const API_URL = REACT_APP_API_URL;

if (!API_URL) {
    throw new Error('Environment variable "REACT_APP_API_URL" not found.');
}
