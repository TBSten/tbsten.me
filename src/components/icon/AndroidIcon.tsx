import classNames from "classnames";
import { FC } from "react";
import { BsAndroid2 } from "react-icons/bs";

interface AndroidIconProps {
    className?: string
}
const AndroidIcon: FC<AndroidIconProps> = ({ className }) => {
    return (
        <BsAndroid2
            className={classNames(
                "text-android",
                className,
            )}
        />
    );
}

export default AndroidIcon;