import classNames from "classnames";
import { FC } from "react";
import { BsGithub } from "react-icons/bs";

interface GithubIconProps {
    className?: string
}
const GithubIcon: FC<GithubIconProps> = ({ className }) => {
    return (
        <BsGithub
            className={classNames(
                "text-github",
                className,
            )}
        />
    );
}

export default GithubIcon;