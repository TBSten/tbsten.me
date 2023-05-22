import classNames from "classnames";
import { FC, ReactNode } from "react";

export interface GameBoxProps {
    containerClassName?: string
    wrapperClassName?: string
    children?: ReactNode
    shadow?: boolean
    color?: "primary" | "secondary"
    variant?: "outlined" | "contained",
}
const GameBox: FC<GameBoxProps> = ({
    containerClassName, wrapperClassName,
    shadow, color = "primary", variant = "outlined",
    children,
}) => {
    return (
        <div className={classNames(
            "font-dot bg-base-100 text-base-content p-1 rounded-lg border border-base-200",
            { "shadow": shadow },
            containerClassName,
        )}>
            <div className={classNames(
                color === "primary" ? "border-primary" : "border-secondary",
                { "bg-primary text-primary-content": variant === "contained" && color === "primary" },
                { "bg-secondary text-secondary-content": variant === "contained" && color === "secondary" },
                "border-2 p-2 rounded-md",
                wrapperClassName,
            )}>
                {children}
            </div>
        </div>
    );
}

export default GameBox;