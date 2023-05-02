import { FC, ReactNode } from "react";
import Center from "../Center";

interface PageTitleProps {
    children?: ReactNode
}
const PageTitle: FC<PageTitleProps> = ({ children }) => {
    return (
        <h1 className="text-4xl md:text-6xl font-dot mt-16 md:mt-32 mb-14 sm font-bold">
            <Center>
                {children}
            </Center>
        </h1>
    );
}

export default PageTitle;
