const path = require("path");

module.exports = {
    stories: [
        "../src/commitUI/components/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/commitUI/containers/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
    ],
};
