import classNames from "classnames";
import { FC, ReactNode } from "react";
import GameBox, { GameBoxProps } from "../GameBox";

interface ChoicesProps extends GameBoxProps {
    title?: ReactNode
}
const Choices: FC<ChoicesProps> = ({ title, wrapperClassName, children, ...props }) => {
    return (
        <GameBox
            wrapperClassName={classNames(
                "flex flex-col",
                wrapperClassName,
            )}
            {...props}
        >
            <div className="my-2 mx-1">
                {title}
            </div>
            <div className="pl-0 md:pl-2">
                {children}
            </div>
        </GameBox>
    );
}

export default Choices;