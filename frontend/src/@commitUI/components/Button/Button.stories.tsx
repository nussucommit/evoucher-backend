import React from "react";
import { Story, Meta } from "@storybook/react";

import { Button, Props } from ".";

export default {
    title: "Components/Button",
    component: Button,
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: "Secondary",
    type: "secondary",
};

export const Danger = Template.bind({});
Danger.args = {
    children: "Danger",
    type: "danger",
};

export const Success = Template.bind({});
Success.args = {
    children: "Success",
    type: "success",
};

export const Outlined = Template.bind({});
Outlined.args = {
    children: "Outlined",
    type: "outlined",
};

export const LinkText = Template.bind({});
LinkText.args = {
    children: "Link Text",
    type: "text",
};

export const Small = Template.bind({});
Small.args = {
    children: "Small",
    size: "small",
};
