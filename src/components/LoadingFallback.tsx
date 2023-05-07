import classNames from "classnames";
import { FC, ReactNode } from "react";

interface LoadingFallbackProps {
    isLoading: boolean
    className?: string
    children?: ReactNode
    type?: "backdrop" | "glass"
}
const LoadingFallback: FC<LoadingFallbackProps> = ({ isLoading, children, className, type = "glass" }) => {
    return (
        <div className={classNames(
            "relative transition-all", className,
            { "opacity-30": type === "glass" && isLoading },
            { "opacity-100": type === "glass" && !isLoading },
        )}>
            {children}
            {type === "backdrop" &&
                <div className={classNames(
                    "w-full h-full absolute top-0 left-0 transition-all",
                    isLoading
                        ? "opacity-100 bg-black bg-opacity-30 visible"
                        : "opacity-0 invisible",
                )} />
            }
        </div>
    );
}

export default LoadingFallback;
