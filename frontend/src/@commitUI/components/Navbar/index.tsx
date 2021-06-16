import React from "react";
import { NavLink as Link } from "react-router-dom";
import styles from "./Navbar.module.css";

interface NavProps {
    children: React.ReactNode;
    color?: string;
    backgroundColor?: string;
}

export const Nav = ({ children, backgroundColor, color }: NavProps) => {
    return (
        <nav
            className={styles.nav}
            style={{ backgroundColor: backgroundColor as string }}
        >
            {children}
        </nav>
    );
};

interface NavLinkProps {
    children: React.ReactNode;
    to: string;
    noActive?: boolean;
}

export const NavLink = ({ children, to, noActive }: NavLinkProps) => {
    return (
        <Link
            to={to}
            className={styles["nav-link"]}
            activeClassName={
                !noActive ? styles["nav-link-active"] : styles["nav-link"]
            }
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
