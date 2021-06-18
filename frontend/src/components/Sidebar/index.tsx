import React from "react";
import {
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SidebarContainer,
    Heading,
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
                        <Heading level={2}>Placeholder</Heading>
                    </SidebarLink>
                    <SidebarLink to="discover" color="#fff">
                        <Heading level={2}>Placeholder</Heading>
                    </SidebarLink>
                    <SidebarLink to="services" color="#fff">
                        <Heading level={2}>Placeholder</Heading>
                    </SidebarLink>
                    <SidebarLink to="signup" color="#fff">
                        <Heading level={2}>Placeholder</Heading>
                    </SidebarLink>
                    <SidebarLink to="signup" color="#fff">
                        <Heading level={2}>Placeholder</Heading>
                    </SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default Sidebar;
