import React, { useState } from "react";

import { Routes } from "constants/routes";

import { Input, Button, Select, Heading } from "@commitUI/index";
import Navbar from "components/Navbar";
import LinkButton from "components/LinkButton";

import styles from "./Register.module.css";
import logo from "../../assets/images/logo.png";
import logo2 from "assets/images/logo2.jpeg";

const Register = () => {
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

                <Heading className={styles.heading}>Sign Up</Heading>

                <Input
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue(event.target.value)
                    }
                    label="Name"
                    className={styles.input}
                />
                {/* <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                > */}
                <Input
                    value={value2}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue2(event.target.value)
                    }
                    label="NUSNET ID"
                    className={styles.input}
                />

                {/* <Input
                    value={value2}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue2(event.target.value)
                    }
                    label="Faculty"
                    style={{ marginBottom: 16 }}
                /> */}
                <Select label="Faculty" className={styles.select} />
                {/* </div> */}
                <Input
                    value={value2}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue2(event.target.value)
                    }
                    label="Password"
                    className={styles.input}
                />

                <Button className={styles.btn}>Sign Up</Button>
                <div className={styles.linkTextContainer}>
                    <LinkButton to={Routes.login} type="text">
                        Already have an account? Sign in.
                    </LinkButton>
                    {/* <span> • </span>
                    <Button type="text" className={styles.btnRight}>
                        Sign Up
                    </Button> */}
                </div>
            </div>
        </>
    );
};

export default Register;
