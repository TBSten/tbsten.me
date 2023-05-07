import Image from "next/image";
import { FC, ReactNode } from "react";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Skill } from "../type";
import SkillCardLayout from "./SkillCardLayout";

interface SkillCardProps {
    skill: Skill
    icon?: ReactNode
    name?: ReactNode
    primaryTags?: ReactNode
    secondaryTags?: ReactNode
    actions?: ReactNode
    floatOnHover?: boolean
}
export const SkillCard: FC<SkillCardProps> = ({
    skill,
    floatOnHover,
    ...slots
}) => {
    return (
        <SkillCardLayout
            floatOnHover={floatOnHover}
            icon={
                slots.icon ??
                <SkillCardIcon {...skill} />
            }
            name={
                slots.name ??
                <SkillCardName {...skill} />
            }
            primaryTags={
                slots.primaryTags ??
                <SkillCardPrimaryTags {...skill} />
            }
            secondaryTags={
                slots.secondaryTags ??
                <SkillCardSecondaryTags {...skill} />
            }
            actions={
                slots.actions ??
                <SkillCardActions />
            }
        />
    );
}


interface SkillCardIconProps {
    icon: Skill["icon"]
    name: Skill["name"]
}
export const SkillCardIcon: FC<SkillCardIconProps> = ({ icon, name }) => {
    return (
        <Image
            className="mr-2 w-10 h-10 object-contain"
            src={icon}
            alt={name}
            width={50} height={50}
        />
    );
}

interface SkillCardNameProps {
    name: Skill["name"]
}
export const SkillCardName: FC<SkillCardNameProps> = ({ name }) => {
    return (
        <>{name}</>
    );
}

interface SkillCardPrimaryTagsProps {
    assessment: Skill["assessment"]
    assessmentMax: Skill["assessmentMax"]
    interest: Skill["interest"]
}
export const SkillCardPrimaryTags: FC<SkillCardPrimaryTagsProps> = ({
    assessment,
    assessmentMax,
    interest,
}) => {
    return (
        <>
            <div className="badge badge-outline badge-secondary">
                <AssessmentStars
                    {...{ assessment, assessmentMax }}
                />
            </div>
            {interest &&
                <div className="badge badge-primary">興味あり</div>
            }
        </>
    );
}

interface AssessmentStarsProps {
    assessment: Skill["assessment"]
    assessmentMax: Skill["assessmentMax"]
}
export const AssessmentStars: FC<AssessmentStarsProps> = ({
    assessment,
    assessmentMax,
}) => {
    return (
        <>
            {Array.from({ length: assessment }, (_, i) =>
                <BsFillStarFill className="text-secondary" key={i} />
            )}
            {Array.from({ length: assessmentMax - assessment }, (_, i) =>
                <BsStar key={i} />
            )}
        </>
    );
}

export default AssessmentStars;


interface SkillCardSecondaryTagsProps {
    tags: Skill["tags"]
}
export const SkillCardSecondaryTags: FC<SkillCardSecondaryTagsProps> = ({ tags }) => {
    return (
        <>
            {tags.map(tag =>
                <div className="badge badge-outline" key={tag}>
                    {tag}
                </div>
            )}
        </>
    );
}

interface SkillCardActionsProps {
}
const SkillCardActions: FC<SkillCardActionsProps> = () => {
    return (
        <></>
    );
}
