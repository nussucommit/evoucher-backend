import React from "react";
import { Modal as AntModal, ModalProps } from "antd";

import "antd/dist/antd.css";

type Props = Omit<
    ModalProps,
    | "closeIcon"
    | "closable"
    | "keyboard"
    | "mask"
    | "maskClosable"
    | "centered"
    | "maskStyle"
    | "onCancel"
> & {
    onClose: () => void; // replaces onCancel
    children: React.ReactNode;
};

export const Modal = ({ children, onClose, ...props }: Props) => {
    return (
        <AntModal {...props} onCancel={onClose}>
            {children}
        </AntModal>
    );
};
