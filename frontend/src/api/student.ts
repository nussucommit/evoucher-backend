import useRequest, { Config } from "./swr";
import request from "./request";

export const useStudents = (config?: Config) =>
    useRequest({ method: "GET", url: "/student" }, config);

export const useStudentsAxios = (config?: Config) =>
    request.get("/student").then((x) => x.status);
