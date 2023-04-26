import Link from "next/link";
import { FC } from "react";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiQiita, SiZenn } from "react-icons/si";
import Center from "../Center";

interface FooterProps {
}
const Footer: FC<FooterProps> = () => {
    return (
        <footer className="p-2 bg-base-200">
            <div className="flex flex-wrap gap-1 justify-end items-end my-8">
                <a href="https://twitter.com/tbs__ten" className="btn btn-outline btn-md btn-ghost btn-square text-twitter " target="_blank">
                    <BsTwitter />
                </a>
                <a href="https://zenn.dev/tbsten" className="btn btn-outline btn-md btn-ghost btn-square text-zenn " target="_blank">
                    <SiZenn />
                </a>
                <a href="https://qiita.com/tbsten" className="btn btn-outline btn-md btn-ghost btn-square text-qiita " target="_blank">
                    <SiQiita />
                </a>
                <a href="https://github.com/tbsten" className="btn btn-outline btn-md btn-ghost btn-square text-github " target="_blank">
                    <BsGithub />
                </a>
            </div>
            <div className="my-4 flex flex-col items-end">
                <Link href="/articles" className="block btn btn-link">
                    技術記事
                </Link>
                <Link href="/skills" className="block btn btn-link">
                    スキル
                </Link>
                <Link href="/certifications" className="block btn btn-link">
                    資格
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