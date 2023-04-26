import classNames from "classnames";
import { FC, ReactNode } from "react";

interface CenterProps {
    className?: string
    children: ReactNode
}
const Center: FC<CenterProps> = ({ className, children }) => {
    return (
        <div className={classNames(
            "flex flex-col justify-center items-center w-full h-full",
            className,
        )}>
            {children}
        </div>
    );
}

export default Center;