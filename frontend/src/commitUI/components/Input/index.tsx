import React, { CSSProperties, useState } from "react";

import {
    COLORS,
    SPACING,
    BORDER_RADIUS,
    FONT_SIZES,
} from "../../constants/theme";

import Icon from "../Icon";
import Text from "../Text";

import "./styles.css";

export type Props = {
    disabled?: boolean;
    disablingAlert?: string | false;
    errorMessage?: string;
    label?: string;
    name: string;
    onBeforeChangeText?: (text: string) => string;
    onFocus?: () => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    style?: CSSProperties;
    /**
     * overrides the local setValue, useful if you want to get value inside input to the parent component
     */
    setFieldValue?: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => void;
    /**
     * (For use with Formik), overrides the local value
     */
    value?: string;
};

const Input = (props: Props): JSX.Element => {
    const {
        disabled,
        disablingAlert,
        errorMessage = "Default Error Message",
        label,
        name,
        onBeforeChangeText,
        onFocus,
        placeholder,
        secureTextEntry,
        style,
        setFieldValue,
        value = "",
    } = props;
    const [backupValue, setBackupValue] = useState<string>("");
    const [touched, setTouched] = useState<boolean>(false);
    const inputDisabled = disabled || Boolean(disablingAlert) === true;
    const hasError =
        touched && Boolean(errorMessage) && backupValue === "" && value === "";
    const [visible, setVisible] = useState(!secureTextEntry);
    const toggleVisible = () => setVisible((v) => !v);
    const handleBlur = (): void => {
        if (!inputDisabled) {
            setTouched(true);
        }
    };
    console.log({
        hasError: hasError,
        touched: touched,
        backupValue: backupValue,
    });

    const content = (
        <div
            style={{
                backgroundColor: COLORS.white,
                flexDirection: "row",
                alignItems: "center",

                width: "50%",
            }}
        >
            <input
                onBlur={handleBlur}
                onChange={
                    setFieldValue
                        ? onBeforeChangeText
                            ? (e) => {
                                  setFieldValue(
                                      name,
                                      onBeforeChangeText(e.target.value)
                                  );
                              }
                            : (e) => {
                                  setFieldValue(name, e.target.value);
                              }
                        : onBeforeChangeText
                        ? (e) => {
                              setBackupValue(
                                  onBeforeChangeText(e.target.value)
                              );
                          }
                        : (e) => {
                              setBackupValue(e.target.value);
                          }
                }
                placeholder={placeholder}
                type={secureTextEntry ? "password" : "text"}
                style={{
                    flex: 1,
                    height: "30px",
                    width: "100%",
                    paddingLeft: SPACING.xs,
                    paddingRight: secureTextEntry ? 45 : SPACING.xs,
                    borderColor: hasError
                        ? COLORS.vermillion600
                        : COLORS.ash700,
                    color: COLORS.ash800,
                    fontSize: FONT_SIZES.sm,
                    fontFamily: "regular",
                    borderRadius: "8px",
                }}
                value={value ? value : backupValue}
                onFocus={onFocus}
            />
            {secureTextEntry && (
                <Icon
                    name={visible ? "eye" : "eye-slash"}
                    onClick={toggleVisible}
                    btnStyle={{
                        position: "absolute",
                        alignItems: "center",
                        width: 46,
                        right: 1,
                    }}
                    color="ash500"
                />
            )}
        </div>
    );
    return (
        <div
            style={{
                ...style,
                marginTop: SPACING.lg,
                opacity: inputDisabled ? 0.5 : 1,
            }}
        >
            {Boolean(label) && (
                <Text type="h6" weight="semibold">
                    {label}
                </Text>
            )}
            {content}
            {hasError && (
                <Text type="h6" weight="semibold" color="danger" size="sm">
                    {errorMessage}
                </Text>
            )}
            {/* {Boolean(disablingAlert) && (
                <Text
                    // size="xs"
                    //   type="warning"
                    style={styles.error}
                >
                    {disablingAlert}
                </Text>
            )} */}
        </div>
    );
};

export default Input;
