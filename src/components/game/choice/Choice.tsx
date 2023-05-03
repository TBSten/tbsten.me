import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ChoiceProps {
    href?: string
    children?: ReactNode
}
const Choice: FC<ChoiceProps> = ({ href, children }) => {
    const Container = href ? "a" : "div"
    return (
        <Container className={classNames(
            "flex flex-row",
        )} href={href}>
            <span className="text-primary ml-1 mr-2">
                ▶︎
            </span>
            <span className={classNames(
                "flex-grow ",
                { "hover:link": href },
            )}>
                {children}
            </span>
        </Container>
    );
}

export default Choice;
