import TBStenImg from "@/../public/tbsten100x100.png";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface HeaderProps {
    action?: ReactNode
}
const Header: FC<HeaderProps> = ({ action }) => {
    return (
        <div className="flex flex-row justify-end md:justify-between items-center flex-wrap pt-2 pb-4">
            <div className="hidden md:block md:flex-grow" />
            <Link href="/" className="btn md:btn-wide text-3xl btn-ghost mx-2">
                TBS
                <Image
                    className="mx-3 w-auto h-10 rounded-lg"
                    src={TBStenImg}
                    alt="TBSten"
                    width={40}
                    height={40}
                />
                ten
            </Link>
            <div className="md:flex-grow md:flex md:flex-row md:justify-end px-2">
                {action}
            </div>
        </div>
    );
}

export default Header;