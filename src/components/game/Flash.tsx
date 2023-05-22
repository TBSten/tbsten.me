import classNames from "classnames";
import { FC, ReactNode, useEffect, useState } from "react";

interface FlashProps {
    className?: string
    children?: ReactNode
    delay?: number
}
const Flash: FC<FlashProps> = ({
    className,
    children,
    delay = 800,
}) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const toggle = setInterval(() => {
            setShow(p => !p)
        }, delay)
        return () => {
            clearInterval(toggle)
        }
    }, [delay])
    return (
        <span className={classNames(
            show ? "opacity-100" : "opacity-0",
            className,
        )}>
            {children}
        </span>
    );
}

export default Flash;