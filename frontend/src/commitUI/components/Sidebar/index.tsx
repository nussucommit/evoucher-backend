import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import {
    Link as LinkScroll,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller,
} from "react-scroll";
import cx from "classnames";

const Sidebar = ({
    isOpen,
    setOpen,
}: {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <SidebarContainer isOpen={isOpen}>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about">About</SidebarLink>
                    <SidebarLink to="discover">Discover</SidebarLink>
                    <SidebarLink to="services">Services</SidebarLink>
                    <SidebarLink to="signup">Signup</SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

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

export default Sidebar;
