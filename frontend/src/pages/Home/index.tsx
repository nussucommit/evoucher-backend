import React from "react";

import useAuth from "hooks/useAuth";

import { Button } from "@commitUI/index";

const Home = () => {
    const { logout } = useAuth();
    return (
        <div>
            <h1>Home</h1>
            <Button onClick={logout}>Log out</Button>
        </div>
    );
};

export default Home;
