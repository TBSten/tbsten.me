import classNames from "classnames";
import { FC } from "react";
import { SiZenn } from "react-icons/si";

interface ZennIconProps {
    className?: string
}
const ZennIcon: FC<ZennIconProps> = ({ className }) => {
    return (
        <SiZenn className={classNames(
            "text-zenn",
            className,
        )} />
    );
}

export default ZennIcon;