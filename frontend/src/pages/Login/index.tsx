import React, { useState } from "react";

import { Input, Button } from "@commitUI/index";
import Navbar from "components/Navbar";

import styles from "./Login.module.css";
import logo from "../../assets/images/logo.png";
import logo2 from "assets/images/logo2.jpeg";

const Login = () => {
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img src={logo2} alt="logo" height={60} />
                    <img src={logo} alt="logo" height={80} />
                </div>
                <Input
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue(event.target.value)
                    }
                    label="First Name"
                    style={{ marginBottom: 16, marginTop: 30 }}
                />
                <Input
                    value={value2}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue2(event.target.value)
                    }
                    label="Last Name"
                    style={{ marginBottom: 16 }}
                />
                <Button>Log In</Button>
                <div className={styles.linkTextContainer}>
                    <Button type="text">Forgot password?</Button>
                    {/* <span> • </span>
                    <Button type="text" className={styles.btnRight}>
                        Sign Up
                    </Button> */}
                </div>
            </div>
        </>
    );
};

export default Login;
