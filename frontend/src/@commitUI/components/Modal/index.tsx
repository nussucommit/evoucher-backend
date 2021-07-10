import React from "react";
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalProps,
} from "@chakra-ui/react";

type Props = ModalProps & {
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
};

export const Modal = ({ title = " ", footer, children, ...props }: Props) => {
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
