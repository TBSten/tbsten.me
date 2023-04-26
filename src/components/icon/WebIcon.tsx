import classNames from "classnames";
import { FC } from "react";
import { IoLogoJavascript } from "react-icons/io";

interface WebIconProps {
    className?: string
}
const WebIcon: FC<WebIconProps> = ({ className }) => {
    return (
        <IoLogoJavascript className={classNames(
            "text-web",
            className,
        )} />
    );
}

export default WebIcon;