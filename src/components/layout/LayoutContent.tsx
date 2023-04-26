import classNames from "classnames";
import { FC } from "react";

export type LayoutContentProps = JSX.IntrinsicElements["div"] & {
    p?: string
}
const LayoutContent: FC<LayoutContentProps> = ({ className, children, p, ...props }) => {
    return (
        <div className={classNames(
            p ?? "p-2 md:p-4",
            className,
        )} {...props}>
            {children}
        </div>
    );
}

export default LayoutContent;
