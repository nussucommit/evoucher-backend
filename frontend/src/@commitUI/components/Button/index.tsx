import React, { ButtonHTMLAttributes } from "react";
import cx from "classnames";

import styles from "./Button.module.css";

export interface Props
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    id?: string;
    block?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    htmlType?: "reset" | "submit";
    loading?: boolean;
    onClick?: () => void;
    shadow?: boolean;
    size?: "small" | "large";
    icon?: React.ReactNode;
    type?: "danger" | "success" | "outlined" | "text" | "primary" | "secondary";
    vCenter?: boolean;
    isSubmit?: boolean;
}

export const Button = ({
    className,
    shadow,
    size = "large",
    type = "primary",
    vCenter,
    children,
    disabled,
    isSubmit,
    ...buttonProps
}: Props) => {
    const cn = cx(
        styles.button,
        {
            [styles.danger]: type === "danger",
            [styles.success]: type === "success",
            [styles.secondary]: type === "secondary",
            [styles.text]: type === "text",
            [styles.outlined]: type === "outlined",
            [styles.small]: size === "small",
            [styles.disabled]: disabled,
        },
        className
    );
    return (
        <button
            {...buttonProps}
            className={cn}
            disabled={Boolean(disabled)}
            type={isSubmit ? "submit" : "button"}
        >
            {children}
        </button>
    );
};
