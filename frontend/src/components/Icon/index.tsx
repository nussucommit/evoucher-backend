import React, { CSSProperties } from "react";

import { COLORS, ICON_SIZES, BORDER_RADIUS } from "../../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@fortawesome/fontawesome-svg-core";

export type IconName =
    | "angle-down"
    | "angle-right"
    | "angle-up"
    | "arrow-left"
    | "arrow-right"
    | "birthday-cake"
    | "bolt"
    | "building"
    | "calendar-check"
    | "camera"
    | "certificate"
    | "check"
    | "church"
    | "circle"
    | "clock"
    | "cog"
    | "copy"
    | "credit-card"
    | "download"
    | "envelope"
    | "exclamation-circle"
    | "eye"
    | "eye-slash"
    | "facebook"
    | "facebook-f"
    | "file-alt"
    | "file-pdf"
    | "file-signature"
    | "gift"
    | "graduation-cap"
    | "heart"
    | "home"
    | "id-badge"
    | "id-card"
    | "info-circle"
    | "instagram"
    | "linkedin-in"
    | "map-pin"
    | "minus"
    | "mobile-alt"
    | "phone"
    | "plus"
    | "question-circle"
    | "search"
    | "sync-alt"
    | "times"
    | "twitter"
    | "user"
    | "user-alt"
    | "user-circle"
    | "whatsapp";

type Props = {
    btnStyle?: CSSProperties;
    name: IconName;
    onClick?: () => void;
    size?: keyof IconSizes;
    color?: keyof Colors;
};

const Icon = (props: Props) => {
    const { btnStyle, name, onClick, size = "base", color = "gray" } = props;
    const icon = (
        <FontAwesomeIcon
            icon={name}
            fontSize={ICON_SIZES[size]}
            color={COLORS[color]}
        />
    );

    if (onClick)
        return (
            <div onClick={onClick} style={btnStyle}>
                {icon}
            </div>
        );
    return icon;
};

export default Icon;
