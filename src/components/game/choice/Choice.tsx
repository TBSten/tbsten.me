import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ChoiceProps {
    href?: string
    children?: ReactNode
    selected?: boolean
}
const Choice: FC<ChoiceProps> = ({ href, children, selected, }) => {
    const Container = href ? "a" : "div"
    return (
        <Container className={classNames(
            "flex flex-row hover:text-primary",
        )} href={href}>
            <span className={classNames(
                selected ? "text-primary" : "text-inherit",
                "ml-1 mr-2",
            )}>
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
