import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";

interface PopupMenuProps {
}
const PopupMenu: FC<PopupMenuProps> = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(p => !p)
    return (
        <>
            <div className="fixed left-0 top-0">
                <div className={classNames(
                    "fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-30 transition-opacity duration-300",
                    open ? "opacity-100 visible" : "opacity-0 invisible",
                )} onClick={toggle} />
                <button className="btn btn-accent btn-lg origin-top-left rounded-l-none rounded-tr-none relative z-50" onClick={toggle}>
                    MENU
                </button>
                <ul className={classNames(
                    "rounded transition-all duration-300 overflow-y-auto w-full relative top-2 left-2 shadow bg-base-100 text-base-content",
                    open ? "h-screen p-4 opacity-100" : "h-0 p-0 opacity-0",
                )}>
                    <li className="text-opacity-80 my-2">
                        TBSten
                    </li>
                    <li>
                        <Link href="/" className="btn btn-wide btn-ghost justify-start">
                            <MdOutlineArticle className="mr-2 text-neutral" />
                            TOP
                        </Link>
                    </li>
                    <li>
                        <Link href="/articles" className="btn btn-wide btn-ghost justify-start">
                            <MdOutlineArticle className="mr-2 text-primary" />
                            記事
                        </Link>
                    </li>
                    <li>
                        <Link href="/skills" className="btn btn-wide btn-ghost justify-start">
                            <BsStarFill className="mr-2 text-secondary" />
                            スキル
                        </Link>
                    </li>
                    <li>
                        <Link href="/certicifations" className="btn btn-wide btn-ghost justify-start">
                            <AiOutlineSafetyCertificate className="mr-2 text-accent" />
                            資格
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default PopupMenu;