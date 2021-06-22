import React from "react";

import useAuth from "hooks/useAuth";
import { useStudents, useStudentsAxios } from "api/student";
import { logout } from "api/auth";
import { getToken } from "utils/auth";

import { Button } from "@commitUI/index";

const Home = () => {
    const { logout: localLogout } = useAuth();
    const res = useStudents();
    console.log(res);

    return (
        <div>
            <h1>Home</h1>
            <p>{JSON.stringify(res.data)}</p>
            <Button
                onClick={() => {
                    const token = getToken();
                    console.log(token);
                    logout({ refresh_token: token!.refresh });
                    localLogout();
                }}
            >
                Log out
            </Button>
        </div>
    );
};

export default Home;
