import React, { ElementRef } from "react";
import ReactSelect, { components, Props } from "react-select";
import cx from "classnames";

import { Text } from "../Text";

import styles from "./Select.module.css";

export interface SelectProps extends Omit<Props, "components" | "placeholder"> {
    label: string;
    id?: string;
    error?: string;
    limitPick?: number;
}

export const Select = ({
    label,
    onChange,
    onBlur,
    value,
    options,
    isMulti,
    isSearchable = false,
    error,
    limitPick = 9999,
    ...props
}: SelectProps) => {
    const currLength = value.length || 0;

    return (
        <ReactSelect
            {...props}
            blurInputOnSelect
            onChange={onChange}
            onBlur={onBlur}
            components={{
                Control: ({ children, ...rest }) => (
                    <Control label={label} error={error} {...rest}>
                        {children}
                    </Control>
                ),
            }}
            placeholder=""
            autoBlur
            options={currLength < limitPick ? options : []}
            noOptionsMessage={() =>
                currLength < limitPick ? "No options" : "Limit reached"
            }
            isMulti={isMulti}
            isSearchable={isSearchable}
            styles={{
                control: (styles, { isFocused, hasValue }) => ({
                    ...styles,
                    minHeight: "54px",
                    border: error
                        ? "rgb(250, 74, 87) 1px solid"
                        : "#d2d2d7 1px solid",
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
        />
    );
};

const Control = (props: any): JSX.Element => {
    const error =
        JSON.stringify(props.error).charAt(0) === '"'
            ? props.error
            : JSON.stringify(props.error).slice(10, -2);

    return (
        <div>
            <Label isFloating={props.isFocused} isFilled={props.hasValue}>
                {props.label}
            </Label>
            <components.Control {...props} />
            {Boolean(props.error) && (
                <Text size="xs" semibold className={styles.error}>
                    {error}
                </Text>
            )}
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
