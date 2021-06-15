import React, { useState } from "react";
import { Nav, NavLink, NavMenu, Button } from "@commitUI/index";
import Sidebar from "components/Sidebar";
import { Squash as Hamburger } from "hamburger-react";

import styles from "./Navbar.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const { height, width } = useWindowDimensions();
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>LOGO</h1>
                </NavLink>
                {width <= 768 && (
                    <div className={styles.hamburger}>
                        <Hamburger
                            toggled={isOpen}
                            toggle={setOpen}
                            color="red"
                        />
                    </div>
                )}
                <NavMenu>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/services">Services</NavLink>
                    <NavLink to="/contactus">Contact Us</NavLink>
                    <NavLink to="/signup">Sign up</NavLink>
                </NavMenu>
                <NavMenu>
                    <Button className={styles.btn} size="small">
                        <NavLink to="/signin">Sign In</NavLink>
                    </Button>
                </NavMenu>
            </Nav>
            <Sidebar isOpen={isOpen} setOpen={setOpen} />
        </>
    );
};

export default Navbar;
