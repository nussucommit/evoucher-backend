import React from "react";
import { Link, LinkProps } from "react-router-dom";

import { Button, ButtonProps } from "@commitUI/index";

interface Props extends ButtonProps {
    to: string;
}

const LinkButton = ({ to, className, ...buttonProps }: Props) => {
    return (
        <Link to={to}>
            <Button className={className} {...buttonProps} />
        </Link>
    );
};

export default LinkButton;
