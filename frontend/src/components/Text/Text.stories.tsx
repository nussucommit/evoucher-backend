import React from "react";
import { Story, Meta } from "@storybook/react";

import Text, { Props } from ".";

export default {
    title: "Components/Text",
    component: Text,
} as Meta;

const Template: Story<Props> = (args) => <Text {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
    children: "Heading 1",
    type: "h1",
};

export const Heading2 = Template.bind({});
Heading2.args = {
    children: "Heading 2",
    type: "h2",
};

export const Heading3 = Template.bind({});
Heading3.args = {
    children: "Heading 3",
    type: "h3",
};

export const Heading4 = Template.bind({});
Heading4.args = {
    children: "Heading 4",
    type: "h4",
};

export const Heading5 = Template.bind({});
Heading5.args = {
    children: "Heading 5",
    type: "h5",
};

export const Colored = Template.bind({});
Colored.args = {
    children: "Heading 1",
    type: "h1",
    color: "primary",
};

export const Thin = Template.bind({});
Thin.args = {
    children: "Heading 1",
    type: "h1",
    color: "primary",
    weight: "thin",
};
