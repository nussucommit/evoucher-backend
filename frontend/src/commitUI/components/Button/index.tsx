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
    type?:
        | "danger"
        | "dashed"
        | "ghost"
        | "light"
        | "link"
        | "primary"
        | "secondary";
    vCenter?: boolean;
}

export const Button = (props: Props) => {
    const {
        className,
        shadow,
        size = "large",
        type = "primary",
        vCenter,
        children,
        disabled,
        ...buttonProps
    } = props;
    const btnType =
        type === "secondary" || type === "danger" || type === "light"
            ? undefined
            : type;
    const cn = cx(
        styles.button,
        {
            [styles.block]: buttonProps.block,
            [styles.shadow]: shadow,
            [styles.vCenter]: vCenter,
            [styles.secondary]: type === "secondary",
            [styles.link]: type === "link",
            [styles.light]: type === "light",
            [styles.small]: size === "small",
        },
        className
    );
    return (
        // <AntdButton
        //     className={cn}
        //     size={size}
        //     type={btnType}
        //     danger={type === "danger"}
        //     {...buttonProps}
        // />
        <button className={cn} disabled={Boolean(disabled)} {...buttonProps}>
            {children}
        </button>
    );
};
