import Link from "next/link";
import { FC, ReactNode } from "react";

interface HeaderProps {
    action?: ReactNode
}
const Header: FC<HeaderProps> = ({ action }) => {
    return (
        <div className="flex flex-row justify-center items-center flex-wrap gap-2 pt-2 pb-4">
            <Link href="/" className="btn btn-wide text-3xl btn-ghost">
                TBSten
            </Link>
            {action}
        </div>
    );
}

export default Header;