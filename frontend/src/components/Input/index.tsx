import React, { CSSProperties, useState } from "react";

import { COLORS, SPACING, BORDER_RADIUS } from "../../constants/theme";

import Icon from "../Icon";

import "./styles.css";

type Props = {
    disabled?: boolean;
    disablingAlert?: string | false;
    errorMessage?: string;
    label?: string;
    name: string;
    newInput?: boolean;
    onBeforeChangeText?: (text: string) => string;
    onFocus?: () => void;
    placeholder?: string;
    preInputContent?: React.ReactNode;
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
        newInput,
        onBeforeChangeText,
        onFocus,
        placeholder,
        preInputContent,
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

    const content = (
        <div
            style={composeStyles(
                newInput ? styles.newInputContainer : styles.inputContainer,
                hasError && styles.inputErrorContainer
            )}
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
                secureTextEntry={!visible}
                style={"newInput" + " " + secureTextEntry && "inputWithIcon"}
                value={value ? value : backupValue}
                onFocus={onFocus}
            />
            {secureTextEntry && (
                <Icon
                    name={visible ? "eye" : "eye-slash"}
                    onClick={toggleVisible}
                    btnStyle={
                        newInput ? styles.newIconButton : styles.iconButton
                    }
                    style={newInput && styles.icon}
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
                <Text
                    size={newInput ? "sm" : "xs"}
                    type="black"
                    weight={newInput ? "semibold" : undefined}
                    style={composeStyles(
                        [
                            composeStyles(styles.label, {
                                fontSize: 16,
                                fontWeight: "600",
                            }),
                        ],
                        [newInput && styles.newLabel]
                    )}
                >
                    {label}
                </Text>
            )}
            {preInputContent ? (
                <div style={styles.inputRow}>
                    {preInputContent}
                    {content}
                </div>
            ) : (
                content
            )}
            {hasError && (
                <Text
                    // size="xs"
                    //   type="danger"
                    style={composeStyles(styles.error, {
                        color: Color.vermilllion,
                        fontSize: 12,
                    })}
                >
                    {errorMessage}
                </Text>
            )}
            {Boolean(disablingAlert) && (
                <Text
                    // size="xs"
                    //   type="warning"
                    style={styles.error}
                >
                    {disablingAlert}
                </Text>
            )}
        </div>
    );
};

export default Input;
