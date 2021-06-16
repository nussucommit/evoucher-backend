import React from "react";
import { Link, LinkProps } from "react-router-dom";

import { Button, ButtonProps } from "@commitUI/index";

interface Props extends ButtonProps {
    to: string;
}

const LinkButton = ({ to, ...buttonProps }: Props) => {
    return (
        <Link to={to}>
            <Button {...buttonProps} />
        </Link>
    );
};

export default LinkButton;
