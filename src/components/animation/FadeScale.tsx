import classNames from "classnames";
import { FC, ReactNode } from "react";
import { IntersectionOptions, useInView } from "react-intersection-observer";
import styles from "./FadeScale.module.scss";

export interface FadeScaleProps {
    scaleSize?: "x" | "y"
    useInViewOptions?: IntersectionOptions
    children?: ReactNode
}
const FadeScale: FC<FadeScaleProps> = ({ scaleSize = "x", children, useInViewOptions, }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 1 / 3, ...useInViewOptions })
    const animateClassName = styles[
        scaleSize === "x" ? "animate-fade-with-scale-x" : "animate-fade-with-scale-y"
    ]
    return (
        <div className={
            classNames("opacity-0", {
                [animateClassName]: inView,
            })
        }
            ref={ref}
        >
            {children}
        </div>
    );
}

export default FadeScale;