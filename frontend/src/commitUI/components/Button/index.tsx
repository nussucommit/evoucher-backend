import React, { CSSProperties } from "react";
import "./styles.css";

import { COLORS } from "../../constants/theme";

export interface Props {
    /**
     * Additional CSS styles for the Button
     */
    buttonStyle?: CSSProperties;
    /**
     * Will be greyed out if disabled
     */
    disabled?: boolean;
    /**
     * Invert the colors
     */
    inverted?: boolean;
    /**
     * Determines the colors of the button and text based on the theme
     */
    type?: "primary" | "secondary" | "success" | "danger" | "warning";
    /**
     * How large should the button be?
     */
    textColor?: string;
    size?: "small" | "medium" | "large";
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}

const Button = ({
    buttonStyle = {},
    disabled = false,
    inverted = false,
    textColor = "white",
    type = "primary",
    size = "medium",
    label,
    onClick,
    ...props
}: Props): JSX.Element => {
    const bgColor = !inverted ? COLORS[type] : textColor;
    const color = !inverted ? textColor : COLORS[type];

    const styles: CSSProperties = {
        ...buttonStyle,
        backgroundColor: bgColor,
        color: color,
        border: `2px solid ${COLORS[type]}`,
        borderRadius: 10,
        cursor: disabled ? "not-allowed" : "",
    };

    return (
        <button
            type="button"
            className={
                disabled
                    ? ["button-disabled", `button--${size}`].join(" ")
                    : ["button", `button--${size}`].join(" ")
            }
            style={styles}
            {...props}
        >
            {label}
        </button>
    );
};

export default Button;
