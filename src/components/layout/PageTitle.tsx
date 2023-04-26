import { FC, ReactNode } from "react";
import Center from "../Center";

interface PageTitleProps {
    children?: ReactNode
}
const PageTitle: FC<PageTitleProps> = ({ children }) => {
    return (
        <h1 className="text-4xl md:text-6xl h-[50vh] my-2 md:my-8 font-bold">
            <Center>
                {children}
            </Center>
        </h1>
    );
}

export default PageTitle;
