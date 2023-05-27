import TBStenImg from "@/../public/tbsten250x250.png";
import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Work } from "../type";

interface WorkCardProps {
    work: Work
    disableLink?: boolean
    slots?: Partial<{
        author: (work: Work) => ReactNode
        title: (work: Work) => ReactNode
        detail: (work: Work) => ReactNode
        image: (work: Work) => ReactNode
        action: (work: Work) => ReactNode
    }>
}
const WorkCard: FC<WorkCardProps> = ({ work, disableLink = false, slots = {} }) => {
    slots = {
        author: (work) => <DefaultWorkCardAuthor work={work} />,
        title: (work) => <DefaultWorkCardTitle work={work} />,
        detail: (work) => <DetailtWorkCardDetail work={work} />,
        image: (work) => <DefaultWorkCardImage work={work} />,
        action: () => <DefaultWorkCardAction work={work} />,
        ...slots,
    } satisfies Required<WorkCardProps["slots"]>
    const content = <>
        <div className="flex-shrink-0">
            <Image
                className="w-12 h-12 rounded-full object-contain"
                src={TBStenImg}
                alt="TBSten"
                width={50}
                height={50}
            />
        </div>
        <div className="flex-grow ">
            {slots.author?.(work)}
            <div>
                <div>
                    {slots.title?.(work)}
                </div>
                <div>
                    {slots.detail?.(work)}
                </div>
                <div>
                    {slots.image?.(work)}
                </div>
            </div>
            <div className="mt-2">
                {slots.action?.(work)}
            </div>
        </div>
    </>
    const containerClassName = "flex flex-row gap-2 p-2 px-4 md:p-4 md:px-6 bg-base-100 duration-300 border-y border-base-200"
    if (disableLink) {
        return <div className={containerClassName}>
            {content}
        </div>
    }
    return (
        <Link href={work.link} target="_blank" className={twMerge(containerClassName, "hover:bg-base-200 cursor-pointer")}>
            {content}
        </Link>
    );
}

export default WorkCard;

export interface DefaultWorkCardAuthorProps {
    work: Work
}
export const DefaultWorkCardAuthor: FC<DefaultWorkCardAuthorProps> = () => {
    return (
        <div className="min-h-6 flex items-center">
            <span className="text-lg">
                TBSten
            </span>
            <span className="text-base-content opacity-70 mx-1">
                @TBSten
            </span>
        </div>
    );
}

export interface DefaultWorkCardTitleProps {
    work: Work
}
export const DefaultWorkCardTitle: FC<DefaultWorkCardTitleProps> = ({ work }) => {
    return (
        <>
            {work.title}
        </>
    );
}

export interface DetailtWorkCardDetailProps {
    work: Work
}
export const DetailtWorkCardDetail: FC<DetailtWorkCardDetailProps> = ({ work }) => {
    return (
        <>
            {work.detail}
        </>
    );
}

export interface DefaultWorkCardImageProps {
    work: Work
}
export const DefaultWorkCardImage: FC<DefaultWorkCardImageProps> = ({ work }) => {
    return (
        <Center className="mt-2 mb-4">
            <Image
                className="w-full h-auto max-w-xs"
                src={work.image}
                alt={work.title}
                width={500}
                height={500}
            />
        </Center>
    );
}
export interface DefaultWorkCardActionProps {
    work: Work
}
export const DefaultWorkCardAction: FC<DefaultWorkCardActionProps> = ({ work }) => {
    return (
        <></>
    );
}
