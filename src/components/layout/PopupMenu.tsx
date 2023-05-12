import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { BsStarFill } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";
import Center from "../Center";
import Drawer, { DrawerContent, useDrawer } from "../Drawer";

interface PopupMenuProps {
}
const PopupMenu: FC<PopupMenuProps> = () => {
    const { drawerProps, hide, toggle } = useDrawer()
    return (
        <>
            <button
                className={classNames(
                    "fixed left-0 btn btn-primary",
                    "top-0 rounded-t-none rounded-bl-none origin-top-left ",
                )}
                onClick={toggle}
            >
                MENU
            </button>
            <Drawer {...drawerProps}>
                <DrawerContent>
                    <ul>
                        <li className="text-opacity-80 pt-4 my-2 sticky top-0 bg-base-100">
                            TBSten
                        </li>
                        <li>
                            <Link href="/" className="btn w-full btn-ghost justify-start">
                                <MdOutlineArticle className="mr-2 text-neutral" />
                                TOP
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile" className="btn w-full btn-ghost justify-start">
                                <span className="mr-2 text-secondary">
                                    😁
                                </span>
                                プロフィール
                            </Link>
                        </li>
                        <li>
                            <Link href="/skills" className="btn w-full btn-ghost justify-start">
                                <BsStarFill className="mr-2 text-secondary" />
                                スキル
                            </Link>
                        </li>
                        <li>
                            <Link href="/works" className="btn w-full btn-ghost justify-start">
                                <span className="mr-2 text-secondary">
                                    🛠️
                                </span>
                                作ったもの
                            </Link>
                        </li>
                        <li>
                            <Link href="/likes" className="btn w-full btn-ghost justify-start">
                                <span className="mr-2 text-secondary">
                                    😍
                                </span>
                                好きなもの
                            </Link>
                        </li>
                        <li>
                            <Link href="/monolog" className="btn w-full btn-ghost justify-start">
                                <span className="mr-2 text-secondary">
                                    😗
                                </span>
                                独り言
                            </Link>
                        </li>
                        <div className="divider" />
                        <li className="sticky bottom-0 bg-base-100 pb-4">
                            <Center>
                                <button className="btn btn-ghost w-full" onClick={hide}>
                                    閉じる
                                </button>
                            </Center>
                        </li>
                    </ul>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default PopupMenu;