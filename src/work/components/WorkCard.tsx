import TBStenImg from "@/../public/tbsten250x250.png";
import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Work } from "../type";

interface WorkCardProps {
    work: Work
}
const WorkCard: FC<WorkCardProps> = ({ work }) => {
    return (
        <Link href={work.link} target="_blank" className="flex flex-row gap-2 p-2 px-4 md:p-4 md:px-6 bg-base-100 hover:bg-base-200 duration-300 cursor-pointer border-y border-base-200">
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
                <div className="min-h-6 flex items-center">
                    <span className="text-lg">
                        TBSten
                    </span>
                    <span className="text-base-content opacity-70 mx-1">
                        @TBSten
                    </span>
                </div>
                <div>
                    <div>
                        {work.title}
                    </div>
                    <div>
                        {work.detail}
                    </div>
                    <Center className="mt-2 mb-4">
                        <Image
                            className="w-full h-auto max-w-xs"
                            src={work.image}
                            alt={work.title}
                            width={500}
                            height={500}
                        />
                    </Center>
                </div>
            </div>
        </Link>
    );
}

export default WorkCard;
