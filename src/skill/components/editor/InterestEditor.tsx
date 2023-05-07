import { Skill } from "@/skill/type";
import classNames from "classnames";
import { FC } from "react";

export interface InterestEditorProps {
    interest: Skill["interest"]
    onToggle: () => void
}
export const InterestEditor: FC<InterestEditorProps> = ({ interest, onToggle }) => {
    return (
        <div className={classNames(
            "badge badge-primary",
            { "badge-outline": !interest }
        )} onClick={onToggle}>
            {interest
                ? "興味あり"
                : "(興味なし)"}
        </div>
    );
}
