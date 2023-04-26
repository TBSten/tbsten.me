import classNames from "classnames";
import { FC } from "react";
import { SiQiita } from "react-icons/si";

interface QiitaIconProps {
    className?: string
}
const QiitaIcon: FC<QiitaIconProps> = ({ className }) => {
    return (
        <SiQiita
            className={classNames(
                "text-qiita",
                className,
            )}
        />
    );
}

export default QiitaIcon;