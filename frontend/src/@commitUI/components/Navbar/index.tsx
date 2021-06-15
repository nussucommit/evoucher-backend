import React from "react";
import { NavLink as Link } from "react-router-dom";
import styles from "./Navbar.module.css";

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
