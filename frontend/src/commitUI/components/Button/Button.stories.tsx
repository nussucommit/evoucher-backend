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
    children: "Default",
};
