module.exports = {
    stories: [
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/pages/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/containers/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
    ],
};
