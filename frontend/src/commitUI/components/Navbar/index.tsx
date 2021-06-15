import React, { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { NavLink as Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Button } from "commitUI/components/Button";
import useWindowDimensions from "hooks/useWindowDimensions";
import Sidebar from "commitUI/components/Sidebar";

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

export const Nav = ({ children }: { children: React.ReactNode }) => {
    return <nav className={styles.nav}>{children}</nav>;
};

export const NavLink = ({
    children,
    to,
}: {
    children: React.ReactNode;
    to: string;
}) => {
    return (
        <Link
            to={to}
            className={styles["nav-link"]}
            activeClassName={styles["nav-link-active"]}
        >
            {children}
        </Link>
    );
};

// export const HamburgerMenu = ({
//     isOpen,
//     toggle,
// }: {
//     isOpen: boolean;
//     toggle: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//     return (
//         <div className={styles.hamburger}>
//             <Hamburger toggled={isOpen} toggle={toggle} />
//         </div>
//     );
// };

export const NavMenu = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.navmenu}>{children}</div>;
};

// export const NavBtn =

export default Navbar;
