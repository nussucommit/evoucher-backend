import React from "react";
import styles from "./Sidebar.module.css";
import { Link as LinkScroll } from "react-scroll";
import cx from "classnames";

export const SidebarContainer = ({
    children,
    isOpen,
}: {
    children: React.ReactNode;
    isOpen: boolean;
}) => {
    return (
        <aside className={cx(styles.container, { [styles.open]: isOpen })}>
            {children}
        </aside>
    );
};

export const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
    return <ul className={styles.menu}>{children}</ul>;
};

export const SidebarLink = ({
    children,
    to,
}: {
    children: React.ReactNode;
    to: string;
}) => {
    return (
        <LinkScroll to={to} className={styles.link}>
            {children}
        </LinkScroll>
    );
};
