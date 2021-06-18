import React from "react";
import ReactSelect, { components, Props } from "react-select";
import cx from "classnames";

import styles from "./Select.module.css";

interface SelectProps extends Omit<Props, "components" | "placeholder"> {
    label: string;
    id?: string;
}

export const Select = ({ label, id, ...props }: SelectProps) => {
    return (
        <ReactSelect
            components={{ Control }}
            placeholder=""
            options={[
                { label: "Business", value: 1 },
                { label: "Computing", value: 2 },
                { label: "Dentistry", value: 3 },
                { label: "Engineering", value: 4 },
                { label: "Humanities and Science", value: 5 },
                { label: "Law", value: 6 },
                { label: "Medicine", value: 7 },
                { label: "Music", value: 8 },
            ]}
            isMulti
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    height: "54px",
                    border: "#d2d2d7 1px solid",
                    borderRadius: "8px",
                }),
            }}
            {...props}
        />
    );
};

const Control = (props: any): JSX.Element => {
    return (
        <div>
            <Label isFloating={props.isFocused || props.hasValue}>
                Faculty
            </Label>
            <components.Control {...props} />
        </div>
    );
};

const Label = ({
    isFloating,
    children,
}: {
    isFloating: boolean;
    children: React.ReactNode;
}) => {
    return (
        <label
            className={cx(styles.label, {
                [styles.floating]: isFloating,
            })}
        >
            {children}
        </label>
    );
};
