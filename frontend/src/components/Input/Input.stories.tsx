import React from "react";
import { Story, Meta } from "@storybook/react";

import Input, { Props } from ".";

export default {
    title: "Containers/Card",
    component: Card,
} as Meta;

const Template: Story<Props> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
