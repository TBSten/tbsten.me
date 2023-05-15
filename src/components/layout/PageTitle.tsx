import classNames from "classnames";
import { FC, ReactNode } from "react";
import Center from "../Center";

interface PageTitleProps {
    children?: ReactNode
    className?: string
}
const PageTitle: FC<PageTitleProps> = ({ children, className, }) => {
    return (
        <h1 className={classNames(
            "text-4xl md:text-6xl font-dot mt-16 md:mt-32 mb-14 sm font-bold text-center",
            className,
        )}>
            <Center>
                {children}
            </Center>
        </h1>
    );
}

export default PageTitle;
