import React from "react";
import ReactSelect, { components, Props } from "react-select";
import cx from "classnames";

import styles from "./Select.module.css";

interface SelectProps extends Omit<Props, "components" | "placeholder"> {
    label: string;
    id?: string;
}

export const Select = ({
    label,
    options,
    isMulti,
    isSearchable = false,
    id,
    ...props
}: SelectProps) => {
    return (
        <ReactSelect
            components={{
                Control: ({ children, ...rest }) => (
                    <Control label={label} {...rest}>
                        {children}
                    </Control>
                ),
            }}
            placeholder=""
            options={options}
            isMulti={isMulti}
            isSearchable={isSearchable}
            styles={{
                control: (styles, { isFocused, isDisabled, hasValue }) => ({
                    ...styles,
                    height: "54px",
                    border: "#d2d2d7 1px solid",
                    borderRadius: "8px",
                    fontSize: 16,
                    outline: "none",
                    boxShadow: isFocused ? "0 0 0 3px #79b1ff" : "none",
                    paddingLeft: hasValue ? 6 : 0,
                    transition: "0.0000001ms linear 0ms",

                    ":hover": {
                        ...styles[":hover"],
                        border: " rgb(151, 158, 166) 1px solid",
                    },
                }),
                valueContainer: (provided) => ({
                    ...provided,
                    paddingTop: 20,
                }),
                singleValue: (provided) => ({
                    ...provided,
                    paddingTop: 18,
                    fontSize: 16,
                }),
                input: (provided) => ({
                    ...provided,
                    paddingLeft: 8,
                    fontSize: 16,
                }),
            }}
            {...props}
        />
    );
};

const Control = (props: any): JSX.Element => {
    return (
        <div>
            <Label isFloating={props.isFocused} isFilled={props.hasValue}>
                {props.label}
            </Label>
            <components.Control {...props} />
        </div>
    );
};

const Label = ({
    isFloating,
    isFilled,
    children,
}: {
    isFloating: boolean;
    isFilled: boolean;
    children: React.ReactNode;
}) => {
    return (
        <label
            className={cx(styles.label, {
                [styles.floating]: isFloating,
                [styles.filled]: isFilled,
            })}
        >
            {children}
        </label>
    );
};
