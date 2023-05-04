import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";
import Center from "../Center";

interface PopupMenuProps {
}
const PopupMenu: FC<PopupMenuProps> = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(p => !p)
    return (
        <>
            <button className="fixed left-0 top-0 btn btn-accent btn-lg origin-top-left rounded-l-none rounded-tr-none z-40" onClick={toggle}>
                MENU
            </button>
            <div className="fixed z-50">
                <div className={classNames(
                    "fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-30 transition-opacity duration-300",
                    open ? "opacity-100 visible" : "opacity-0 invisible",
                )} onClick={toggle} />
                <ul className={classNames(
                    "fixed left-2 top-2 rounded transition-all h-[calc(100vh-10px)] duration-300 overflow-y-auto  shadow bg-base-100 text-base-content z-40 w-fit",
                    open ? "opacity-100 py-0 px-4 visible" : "opacity-0 p-0 invisible",
                )}>
                    <li className="text-opacity-80 pt-4 my-2 sticky top-0 bg-base-100">
                        TBSten
                    </li>
                    <li>
                        <Link href="/" className="btn btn-wide btn-ghost justify-start">
                            <MdOutlineArticle className="mr-2 text-neutral" />
                            TOP
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile" className="btn btn-wide btn-ghost justify-start">
                            <span className="mr-2 text-secondary">
                                😁
                            </span>
                            プロフィール
                        </Link>
                    </li>
                    <li>
                        <Link href="/skills" className="btn btn-wide btn-ghost justify-start">
                            <BsStarFill className="mr-2 text-secondary" />
                            スキル
                        </Link>
                    </li>
                    <li>
                        <Link href="/works" className="btn btn-wide btn-ghost justify-start">
                            <span className="mr-2 text-secondary">
                                🛠️
                            </span>
                            作ったもの
                        </Link>
                    </li>
                    <div className="divider" />
                    <li className="sticky bottom-0 bg-base-100 pb-4">
                        <Center>
                            <button className="btn btn-ghost w-full" onClick={toggle}>
                                閉じる
                            </button>
                        </Center>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default PopupMenu;