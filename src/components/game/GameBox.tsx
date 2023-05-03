import classNames from "classnames";
import { FC, ReactNode } from "react";

export interface GameBoxProps {
    containerClassName?: string
    wrapperClassName?: string
    children?: ReactNode
    shadow?: boolean
}
const GameBox: FC<GameBoxProps> = ({
    containerClassName, wrapperClassName,
    shadow,
    children,
}) => {
    return (
        <div className={classNames(
            "font-dot bg-base-100 text-base-content p-1 rounded-lg ",
            "m-2",
            { "shadow": shadow },
            containerClassName,
        )}>
            <div className={classNames(
                "border-2 border-primary p-2 rounded-md",
                wrapperClassName,
            )}>
                {children}
            </div>
        </div>
    );
}

export default GameBox;