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
            <Nav backgroundColor="#002A56" color="#fff">
                <NavLink to="/" noActive>
                    <h3>NUSSU eVouchers (Beta)</h3>
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
