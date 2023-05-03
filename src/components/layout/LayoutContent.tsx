import classNames from "classnames";
import { FC } from "react";

export type LayoutContentProps = JSX.IntrinsicElements["div"] & {
    p?: string
}
const LayoutContent: FC<LayoutContentProps> = ({ className, children, p, ...props }) => {
    return (
        <div className={classNames(
            p ?? "p-2 md:p-4",
            "flex flex-col items-center",
            className,
        )} {...props}>
            <div className="max-w-5xl w-full">
                {children}
            </div>
        </div>
    );
}

export default LayoutContent;
