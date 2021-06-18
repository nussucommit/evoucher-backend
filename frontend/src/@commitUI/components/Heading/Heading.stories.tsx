import React from "react";
import { Story, Meta } from "@storybook/react";

import { Heading, Props } from ".";

export default {
    title: "Components/Heading",
    component: Heading,
} as Meta;

const Template: Story<Props> = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {};
