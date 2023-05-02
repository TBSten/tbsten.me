import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode
    p?: string
}
const Container: FC<ContainerProps> = ({ p, children }) => {
    return (
        <div className={classNames(
            "w-full max-w-7xl",
            p ?? "px-2",
        )}>
            {children}
        </div>
    );
}

export default Container;
