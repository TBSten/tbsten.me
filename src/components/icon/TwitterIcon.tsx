import classNames from "classnames";
import { FC } from "react";
import { BsTwitter } from "react-icons/bs";

interface TwitterIconProps {
    className?: string
}
const TwitterIcon: FC<TwitterIconProps> = ({ className }) => {
    return (
        <BsTwitter
            className={classNames(
                "text-twitter",
                className,
            )}
        />
    );
}

export default TwitterIcon;