import React, { useState } from "react";

import { Routes } from "constants/routes";
import { login } from "api/auth";

import { Input, Button, Heading } from "@commitUI/index";
import Navbar from "components/Navbar";
import LinkButton from "components/LinkButton";

import styles from "./Login.module.css";
import logo from "../../assets/images/logo.png";
import logo2 from "assets/images/logo2.jpeg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({
        access: "",
        refresh: "",
    });

    const handleLogin = async () => {
        console.log("login");
        const res = await login({ username, password });
        console.log(res);
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img src={logo2} alt="logo" height={60} />
                    <img src={logo} alt="logo" height={80} />
                </div>

                <Heading level={1} className={styles.heading}>
                    Sign In
                </Heading>

                <Input
                    value={username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(event.target.value)
                    }
                    label="NUSNET ID"
                    className={styles.input}
                />

                <Input
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(event.target.value)
                    }
                    label="Password"
                    type="password"
                    className={styles.input}
                />

                <Button className={styles.btn} onClick={() => handleLogin()}>
                    Log In
                </Button>

                <div className={styles.linkTextContainer}>
                    <Button type="text">Forgot password?</Button>
                    {/* <span> • </span>
                    <Button type="text" className={styles.btnRight}>
                        Sign Up
                    </Button> */}
                    <Heading level={4} className={styles.or}>
                        <span>or</span>
                    </Heading>
                    <LinkButton
                        to={Routes.register}
                        type="outlined"
                        className={styles.register}
                        size="small"
                    >
                        Sign Up
                    </LinkButton>
                </div>
            </div>
        </>
    );
};

export default Login;
