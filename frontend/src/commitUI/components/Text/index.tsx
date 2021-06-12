import React, { CSSProperties } from "react";
import { FONT_SIZES, COLORS, FONT_WEIGHT } from "../../constants/theme";
import "./styles.css";

export type Props = {
    // accessibilityRole?: "link";
    centered?: boolean;
    children?: React.ReactNode;
    // disabled?: boolean;
    // href?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (params: any) => void;
    size?: keyof FontSizes;
    style?: CSSProperties;
    type:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "body"
        | "listheading"
        | "lowestlevelheading";
    color?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "white"
        | "black"
        | "ink"
        | "cerulean";
    uppercase?: boolean;
    weight?: keyof FontWeights;
};

const Text = (props: Props) => {
    const {
        centered,
        children,
        onClick,
        size,
        style,
        type,
        color,
        uppercase,
        weight,
    } = props;
    const textStyles: CSSProperties = {
        ...style,
        textAlign: centered ? "center" : "inherit",
        fontSize: size ? FONT_SIZES[size] : FONT_SIZES[type],
        color: color ? COLORS[color] : COLORS.ash700,
        textTransform: uppercase ? "uppercase" : "none",
        fontWeight: weight ? FONT_WEIGHT[weight] : FONT_WEIGHT[type],
    };
    if (type === "h1") {
        return (
            <h1 style={textStyles} onClick={onClick}>
                {children}
            </h1>
        );
    }
    if (type === "h2") {
        return (
            <h2 style={textStyles} onClick={onClick}>
                {children}
            </h2>
        );
    }
    if (type === "h3") {
        return (
            <h3 style={textStyles} onClick={onClick}>
                {children}
            </h3>
        );
    }
    if (type === "h4") {
        return (
            <h4 style={textStyles} onClick={onClick}>
                {children}
            </h4>
        );
    }
    if (type === "h5") {
        return (
            <h5 style={textStyles} onClick={onClick}>
                {children}
            </h5>
        );
    }
    if (type === "h6") {
        return (
            <h6 style={textStyles} onClick={onClick}>
                {children}
            </h6>
        );
    }
    if (type === "body") {
        return (
            <p style={textStyles} className="body" onClick={onClick}>
                {children}
            </p>
        );
    }
    if (type === "listheading") {
        return (
            <p style={textStyles} className="listheading" onClick={onClick}>
                {children}
            </p>
        );
    }
    return (
        <p style={textStyles} className="lowestlevelheading" onClick={onClick}>
            {children}
        </p>
    );
};

export default Text;
