import React from "react";
import cx from "classnames";

import styles from "./Text.module.css";

export type Props = {
    block?: boolean;
    centered?: boolean;
    children?: React.ReactNode;
    className?: string;
    ellipsize?: boolean;
    noLeading?: boolean;
    paragraph?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    strong?: boolean;
    subheading?: boolean;
    type?:
        | "black"
        | "danger"
        | "light"
        | "lighter"
        | "lightest"
        | "primary"
        | "success"
        | "warning"
        | "white";
    uppercase?: boolean;
};

export const Text = (props: Props) => {
    const {
        block,
        centered,
        children,
        className,
        ellipsize,
        noLeading,
        paragraph,
        size,
        strong,
        subheading,
        type,
        uppercase,
    } = props;
    const cn = cx(
        styles.text,
        {
            [styles.centered]: centered,
            [styles.strong]: strong || subheading,
            [styles.noLeading]: noLeading,
            [styles.ellipsize]: ellipsize,
            [styles.uppercase]: uppercase,
            [styles.xs]: size === "xs",
            [styles.sm]: size === "sm",
            [styles.md]: size === "md",
            [styles.lg]: size === "lg" || subheading,
            [styles.xl]: size === "xl",
            [styles.light]: type === "light",
            [styles.lighter]: type === "lighter",
            [styles.lightest]: type === "lightest",
            [styles.black]: type === "black" || subheading,
            [styles.white]: type === "white",
            [styles.primary]: type === "primary",
            [styles.success]: type === "success",
            [styles.danger]: type === "danger",
            [styles.warning]: type === "warning",
        },
        className
    );
    if (paragraph) return <p className={cn}>{children}</p>;
    if (block) return <div className={cn}>{children}</div>;
    return <span className={cn}>{children}</span>;
};
