import React from "react";
import {
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SidebarContainer,
} from "@commitUI/index";

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

export default Sidebar;
