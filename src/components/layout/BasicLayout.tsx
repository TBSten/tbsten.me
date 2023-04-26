import classNames from "classnames";
import { FC, ReactNode } from "react";

interface BasicLayoutProps {
    className?: string
    children: ReactNode
}
const BasicLayout: FC<BasicLayoutProps> = ({ className, children }) => {
    return (
        <div className={classNames(
            "overflow-x-auto w-full overscroll-contain",
            className,
        )}>
            {children}
        </div>
    );
}

export default BasicLayout;