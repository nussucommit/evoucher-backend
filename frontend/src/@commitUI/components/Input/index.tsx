import React, { InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

interface ExtendedInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
    label?: string;
}

export const Input = ({ value, label, ...rest }: ExtendedInputProps) => {
    return (
        <div className={styles.container} {...rest}>
            <input type="text" />
            <label className={value !== "" ? styles.filled : ""}>{label}</label>
        </div>
    );
};
