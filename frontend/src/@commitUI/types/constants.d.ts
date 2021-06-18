type Colors = {
    primary: string;
    primaryLighter: string;
    primaryLightest: string;
    secondary: string;
    success: string;
    successLighter: string;
    successLightest: string;
    danger: string;
    dangerLighter: string;
    dangerLightest: string;
    warning: string;
    warningLighter: string;
    warningLightest: string;

    gray: string;
    grayLight: string;
    grayLighter: string;
    grayLightest: string;

    offwhiteDark: string;
    offwhite: string;
    offwhiteLight: string;

    border: string;
    shadow: string;

    white: string;
    black: string;

    trueBlack: string;
    trueBlack60: string;

    transparent: string;
    transparentWhite: string;

    facebook: string;

    cerulean: string;
    ceruleanDark: string;
    ceruleanLight: string;

    ink: string;

    ash100: string;
    ash200: string;
    ash300: string;
    ash400: string;
    ash500: string;
    ash600: string;
    ash700: string;
    ash800: string;

    dye200: string;
    dye700: string;

    forest200: string;
    forest500: string;
    forest700: string;

    lemon100: string;
    lemon500: string;

    sky100: string;
    sky200: string;
    sky400: string;
    sky500: string;
    sky600: string;
    sky700: string;
    sky800: string;

    tropic200: string;
    tropic300: string;
    tropic400: string;
    tropic500: string;
    tropic700: string;

    vermillion200: string;
    vermillion600: string;
    vermillion700: string;
};

type FontWeights = {
    thin: number | "normal" | "bold" | "lighter";
    regular: number | "normal" | "bold" | "lighter";
    semibold: number | "normal" | "bold" | "lighter";
    bold: number | "normal" | "bold" | "lighter";
    h1: number | "normal" | "bold" | "lighter";
    h2: number | "normal" | "bold" | "lighter";
    h3: number | "normal" | "bold" | "lighter";
    h4: number | "normal" | "bold" | "lighter";
    h5: number | "normal" | "bold" | "lighter";
    h6: number | "normal" | "bold" | "lighter";
    body: number | "normal" | "bold" | "lighter";
    listheading: number | "normal" | "bold" | "lighter";
    lowestlevelheading: number | "normal" | "bold" | "lighter";
};

type FontSizes = {
    "2xs": number;
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
    body: number;
    listheading: number;
    lowestlevelheading: number;
};

type IconSizes = {
    "4xs": number;
    "3xs": number;
    "2xs": number;
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
};

type Spacings = {
    "3xs": number;
    "2xs": number;
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
    "5xl": number;
};

type Theme = {
    COLORS: Colors;
    FONT_WEIGHT: FontWeights;
    FONT_SIZES: FontSizes;
    ICON_SIZES: IconSizes;
    SPACING: Spacings;

    borderRadius: number;
    maxWidthWeb: number;
};
