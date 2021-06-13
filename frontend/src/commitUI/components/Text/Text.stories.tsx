import React from "react";
import { Story, Meta } from "@storybook/react";

import { Text, Props } from ".";

export default {
    title: "Components/Text",
    component: Text,
} as Meta;

const Template: Story<Props> = (args) => <Text {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
    children: "Heading 1",
};
