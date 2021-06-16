import React from "react";
import {
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SidebarContainer,
} from "@commitUI/index";

const Sidebar = ({
    isOpen,
    backgroundColor,
}: {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    backgroundColor?: string;
}) => {
    return (
        <SidebarContainer isOpen={isOpen} backgroundColor={backgroundColor}>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" color="#fff">
                        About
                    </SidebarLink>
                    <SidebarLink to="discover" color="#fff">
                        Discover
                    </SidebarLink>
                    <SidebarLink to="services" color="#fff">
                        Services
                    </SidebarLink>
                    <SidebarLink to="signup" color="#fff">
                        Signup
                    </SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;
