import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

import Sidebar from "components/Sidebar";
import { Nav, NavLink, Heading } from "@commitUI/index";

import styles from "./Navbar.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const { height, width } = useWindowDimensions();
    return (
        <>
            <Nav backgroundColor="#002A56" color="#fff">
                <NavLink to="/" noActive>
                    <Heading level={1}>NUSSU eVouchers</Heading>
                </NavLink>

                {width <= 768 && (
                    <div className={styles.hamburger}>
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                )}
            </Nav>
            <Sidebar
                isOpen={isOpen}
                setOpen={setOpen}
                backgroundColor="#002A56"
            />
        </>
    );
};

export default Navbar;
