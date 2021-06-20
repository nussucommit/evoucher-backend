import React from "react";
import { useField } from "formik";
import { Input as BaseInput, InputProps } from "@commitUI/index";

type Props = InputProps & {
    name: string;
};

export const Input = ({ name, id, ...props }: Props) => {
    const [field, meta] = useField(name);
    const { touched, error } = meta;

    return (
        <BaseInput
            id={name}
            error={touched && error ? error : ""}
            {...field}
            {...props}
        />
    );
};
