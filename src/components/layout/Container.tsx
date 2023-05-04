import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode
    p?: string
    className?: string
}
const Container: FC<ContainerProps> = ({ p, className, children }) => {
    return (
        <div className="w-full flex justify-center">
            <div className={classNames(
                "w-full max-w-7xl",
                p ?? "px-2",
                className,
            )}>
                {children}
            </div>
        </div>
    );
}

export default Container;
