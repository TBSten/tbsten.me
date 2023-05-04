import classNames from "classnames";
import { FC, ReactNode } from "react";
import GameBox from "./GameBox";

type CommandButtonProps = JSX.IntrinsicElements["button"] & {
    startIcon?: ReactNode
    color?: "primary" | "secondary"
    variant?: "outlined" | "contained",
}
const CommandButton: FC<CommandButtonProps> = ({ color, variant, startIcon, className, children, ...props }) => {
    return (
        <button
            className={classNames(
                "transition-all duration-300",
                "hover:brightness-90",
                "active:scale-95 ",
                "relative before:hidden focus:before:block hover:before:block before:content-['👉'] before:absolute before:-left-2 before:top-3 before:text-xl",
                {
                    "opacity-50 active:scale-100": props.disabled,
                    "before:content-['❌'] ": props.disabled,
                },
                className,
            )}
            {...props}
        >
            <GameBox {...{ color, variant }}>
                <div className="flex flex-row gap-2 items-center">
                    {startIcon &&
                        <div className="flex-shrink-0">
                            {startIcon}
                        </div>
                    }
                    <div className="flex-grow text-start">
                        {children}
                    </div>
                </div>
            </GameBox>
        </button>
    );
}

export default CommandButton;