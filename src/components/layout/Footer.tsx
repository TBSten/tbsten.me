import Link from "next/link";
import { FC } from "react";
import Center from "../Center";
import GithubIcon from "../icon/GithubIcon";
import QiitaIcon from "../icon/QiitaIcon";
import TwitterIcon from "../icon/TwitterIcon";
import ZennIcon from "../icon/ZennIcon";

interface FooterProps {
}
const Footer: FC<FooterProps> = () => {
    return (
        <footer className="p-2 bg-base-200">
            <div className="flex flex-wrap gap-1 justify-end items-end my-8">
                <a href="https://twitter.com/tbs__ten" className="btn btn-outline btn-md btn-ghost btn-square text-twitter hover:bg-base-100 hover:border-base-300" target="_blank">
                    <TwitterIcon />
                </a>
                <a href="https://zenn.dev/tbsten" className="btn btn-outline btn-md btn-ghost btn-square text-zenn hover:bg-base-100 hover:border-base-300" target="_blank">
                    <ZennIcon />
                </a>
                <a href="https://qiita.com/tbsten" className="btn btn-outline btn-md btn-ghost btn-square text-qiita hover:bg-base-100 hover:border-base-300" target="_blank">
                    <QiitaIcon />
                </a>
                <a href="https://github.com/tbsten" className="btn btn-outline btn-md btn-ghost btn-square text-github hover:bg-base-100 hover:border-base-300" target="_blank">
                    <GithubIcon />
                </a>
            </div>
            <div className="my-4 flex flex-col items-end">
                <Link href="/" className="block btn btn-link">
                    TOP
                </Link>
                <Link href="/profile" className="block btn btn-link">
                    プロフィール
                </Link>
                <Link href="/skills" className="block btn btn-link">
                    スキル
                </Link>
                <Link href="/works" className="block btn btn-link">
                    作ったもの
                </Link>
                <Link href="/monolog" className="block btn btn-link">
                    独り言
                </Link>
            </div>
            <Center className="my-4">
                <Link href="/" className="btn btn-wide btn-ghost text-2xl">
                    TBSten
                </Link>
            </Center>
        </footer>
    );
}

export default Footer;