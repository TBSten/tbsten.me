import classNames from "classnames";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PopupMenu from "./PopupMenu";

interface BasicLayoutProps {
    className?: string
    children: ReactNode
    headerAction?: ReactNode
}
const BasicLayout: FC<BasicLayoutProps> = ({ headerAction, className, children }) => {
    return (
        <div className={classNames(
            "overflow-x-auto w-full overscroll-contain",
            className,
        )}>
            <Header action={headerAction} />
            {children}
            <Footer />
            <PopupMenu />
        </div>
    );
}

export default BasicLayout;
