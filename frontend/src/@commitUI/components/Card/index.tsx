import React from "react";
import cx from "classnames";

import styles from "./Card.module.css";

export interface CardProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Card = ({
    style,
    className,
    children,
    onClick,
}: CardProps): JSX.Element => {
    const cn = cx(styles.container, className);
    return (
        <div className={cn} style={style} onClick={onClick}>
            {children}
        </div>
    );
};
