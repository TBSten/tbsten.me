import classNames from "classnames";
import { FC, ReactNode } from "react";

interface SkillCardLayoutProps {
    icon?: ReactNode
    name?: ReactNode
    primaryTags?: ReactNode
    secondaryTags?: ReactNode
    actions?: ReactNode
    floatOnHover?: boolean
}
const SkillCardLayout: FC<SkillCardLayoutProps> = ({
    icon, name, primaryTags, secondaryTags, actions,
    floatOnHover = true,
}) => {
    return (
        <div className={classNames(
            'p-2 md:p-4 rounded bg-base-100 duration-300',
            { "hover:shadow hover:-translate-y-1 ": floatOnHover },
        )}>
            <div className="">
                <div className="mt-2 mb-4 font-bold text-lg flex flex-row items-center">
                    {icon}
                    <span className="flex-grow ">
                        {name}
                    </span>
                </div>
                <div className="flex flex-row flex-wrap gap-1 justify-end my-2">
                    {primaryTags}
                </div>
                <div className="flex flex-row flex-wrap gap-1 justify-end my-2">
                    {secondaryTags}
                </div>
            </div>
            {actions}
        </div>
    );
}

export default SkillCardLayout;