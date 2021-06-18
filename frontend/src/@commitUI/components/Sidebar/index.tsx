import React from "react";
import styles from "./Sidebar.module.css";
import { Link as LinkScroll } from "react-scroll";
import cx from "classnames";

export const SidebarContainer = ({
    children,
    isOpen,

    backgroundColor = "",
}: {
    children: React.ReactNode;
    isOpen: boolean;

    backgroundColor?: string | undefined;
}) => {
    return (
        <aside
            className={cx(styles.container, { [styles.open]: isOpen })}
            style={{ backgroundColor: backgroundColor }}
        >
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
    color = "",
}: {
    children: React.ReactNode;
    to: string;
    color?: string | undefined;
}) => {
    return (
        <LinkScroll to={to} className={styles.link} style={{ color: color }}>
            {children}
        </LinkScroll>
    );
};
