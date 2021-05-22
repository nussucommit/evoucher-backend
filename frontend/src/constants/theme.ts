const THEME: Theme = {
    COLORS: {
        primary: "#3151AA",
        primaryLighter: "#A4D2FF",
        primaryLightest: "#D2E8FF",
        secondary: "#4469D1",
        success: "#2F855A",
        successLighter: "#C0DACD",
        successLightest: "#E0EDE7",
        danger: "#E53E3E",
        dangerLighter: "#F9D1D1",
        dangerLightest: "#FBE7E7",
        warning: "#DD6B20",
        warningLighter: "#F4D2BC",
        warningLightest: "#FAE9DE",

        gray: "#4A5568",
        grayLight: "#718096",
        grayLighter: "#A0AEC0",
        grayLightest: "#E2E8F0",

        offwhiteDark: "#EDF2F7",
        offwhite: "#F2F6FA",
        offwhiteLight: "#F7FAFC",

        border: "#E2E8F0",
        shadow: "rgba(158, 158, 158, 0.5)",

        white: "#FFFFFF",
        black: "#1A202C",

        trueBlack: "#000000",
        trueBlack60: "rgba(0, 0, 0, 0.6)",

        transparent: "transparent",
        transparentWhite: "rgba(255, 255, 255, 0)",

        facebook: "#1876F2",

        cerulean: "#3151AA",
        ceruleanDark: "#224D77",
        ceruleanLight: "#D2E8FF",

        ink: "#2D3748",

        ash100: "#F7FAFC",
        ash200: "#EDF2F7",
        ash300: "#E2E8F0",
        ash400: "#CBD5E0",
        ash500: "#A0AEC0",
        ash600: "#718096",
        ash700: "#4A5568",
        ash800: "#2D3748",

        dye200: "#C3DAFE",
        dye700: "#4C51BF",

        forest200: "#C6F6D5",
        forest500: "#48BB78",
        forest700: "#2F855A",

        lemon100: "#FFFFF0",
        lemon500: "#ECC94B",

        sky100: "#EBF8FF",
        sky200: "#BEE3F8",
        sky400: "#63B3ED",
        sky500: "#4587EF",
        sky600: "#3182CE",
        sky700: "#2B6CB0",
        sky800: "#2C5282",

        tropic200: "#FEEBC8",
        tropic300: "#FBD38D",
        tropic400: "#F6AD55",
        tropic500: "#ED8936",
        tropic700: "#C05621",

        vermillion200: "#FED7D7",
        vermillion600: "#E53E3E",
        vermillion700: "#C53030",
    },
    FONT_WEIGHT: {
        thin: "lighter",
        regular: "normal",
        semibold: 600,
        bold: "bold",
        h1: "bold",
        h2: "bold",
        h3: "bold",
        h4: "bold",
        h5: "bold",
        h6: "bold",
        body: "normal",
        listheading: "bold",
        lowestlevelheading: "bold",
    },
    FONT_SIZES: {
        "2xs": 10,
        xs: 12,
        sm: 14,
        base: 16,
        md: 18,
        lg: 20,
        xl: 24,
        "2xl": 30,
        h1: 40,
        h2: 32,
        h3: 28,
        h4: 24,
        h5: 20,
        h6: 16,
        body: 14,
        listheading: 12,
        lowestlevelheading: 11,
    },
    ICON_SIZES: {
        "4xs": 8,
        "3xs": 10,
        "2xs": 12,
        xs: 14,
        sm: 16,
        base: 18,
        md: 20,
        lg: 24,
        xl: 32,
        "2xl": 40,
    },
    SPACING: {
        "3xs": 2,
        "2xs": 5,
        xs: 10,
        sm: 15,
        base: 20,
        md: 25,
        lg: 30,
        xl: 40,
        "2xl": 50,
        "3xl": 60,
        "4xl": 80,
        "5xl": 100,
    },

    borderRadius: 10,
    maxWidthWeb: 400,
};

export const COLORS = THEME.COLORS;
export const FONT_WEIGHT = THEME.FONT_WEIGHT;
export const FONT_SIZES = THEME.FONT_SIZES;
export const ICON_SIZES = THEME.ICON_SIZES;
export const SPACING = THEME.SPACING;
export const BORDER_RADIUS = THEME.borderRadius;
export const MAX_WIDTH_WEB = THEME.maxWidthWeb;

export default THEME;
