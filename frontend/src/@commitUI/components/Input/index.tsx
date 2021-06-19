import React, { InputHTMLAttributes } from "react";
import cx from "classnames";

import styles from "./Input.module.css";

interface ExtendedInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
    label?: string;
}

export const Input = ({
    value,
    label,
    id,
    // To-do: add additional styling for disabled state (make it more visible that it is disabled)
    disabled,
    className,
    type = "text",
    ...rest
}: ExtendedInputProps) => {
    const cn = cx(styles.container, className);

    return (
        <div className={cn} {...rest}>
            <input
                type={type}
                id={id as string}
                disabled={disabled as boolean}
            />
            <label className={value !== "" ? styles.filled : ""}>{label}</label>
        </div>
    );
};
