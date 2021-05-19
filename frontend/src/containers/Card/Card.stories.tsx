import React from "react";
import { Story, Meta } from "@storybook/react";

import Card, { Props } from ".";

export default {
    title: "Containers/Card",
    component: Card,
} as Meta;

const Template: Story<Props> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
