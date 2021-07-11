import React from "react";
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalProps as ChakraModalProps,
} from "@chakra-ui/react";

export type ModalProps = ChakraModalProps & {
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
};

export const Modal = ({
    title = " ",
    footer,
    children,
    ...props
}: ModalProps) => {
    return (
        <ChakraModal {...props}>
            <ModalOverlay />
            <ModalContent>
                {Boolean(title) && <ModalHeader>{title}</ModalHeader>}
                <ModalCloseButton />

                <ModalBody>{children}</ModalBody>

                {footer && <ModalFooter>{footer}</ModalFooter>}
            </ModalContent>
        </ChakraModal>
    );
};
