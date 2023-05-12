import ZtmyImg from "@/../public/zutomayo_profile.jpg";
import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { NextPage } from 'next';
import Link from 'next/link';
import styles from "./likes.module.scss";

interface Props {
}
const LikesPage: NextPage<Props> = ({ }) => {
    return (
        <>
            <LikesHead />
            <BasicLayout>
                <PageTitle>
                    好きなもの
                </PageTitle>
                <ZtmySection />
                <EngineerChannel />
            </BasicLayout>
        </>
    );
}
export default LikesPage;

import Flash from '@/components/game/Flash';
import classNames from 'classnames';
import Image from 'next/image';
import { FC } from "react";

interface LikesHeadProps {
}
export const LikesHead: FC<LikesHeadProps> = () => {
    return (
        <PageHead
            path='/likes'
            title='好きなもの | TBSten'
            description='TBStenの好きなものを紹介します。'
        />
    );
}


interface SectionTitleProps {
    href: string
    children: string
}
const SectionTitle: FC<SectionTitleProps> = ({
    href,
    children,
}) => {
    return (
        <h2 className={classNames(
            "text-3xl text-primary relative group",
        )} id={children}>
            <Link href={href} target='_blank' className='hover:link'>
                <Flash className='w-fit'>
                    ▶︎{" "}
                </Flash>
                {children}
            </Link>
        </h2>
    );
}

interface ZtmySectionProps {
}
const ZtmySection: FC<ZtmySectionProps> = () => {
    return (
        <LayoutContent className={styles["section"]}>
            <Container>
                <SectionTitle href={"https://zutomayo.net/"}>
                    ずっと真夜中でいいのに。
                </SectionTitle>
                <div className="md:pl-4">
                    <Link href="https://zutomayo.net/profile/" target="_blank">
                        <Image
                            src={ZtmyImg}
                            alt="ずっと真夜中でいいのに。"
                            width={1500}
                            height={844}
                        />
                    </Link>
                    <div className="mt-2 mb-6 text-center opacity-70">
                        https://zutomayo.net/profile/ より引用
                    </div>
                    <p>
                        若者を中心にミステリアスな雰囲気で人気を集めているアーティストです。
                    </p>
                    <p>
                        きっかけは
                        <Link className='link-primary' href="https://www.youtube.com/watch?v=ZUwaudw8ht0">
                            あいつら全員同窓会
                        </Link>
                        という楽曲。<br />
                        ミュージックビデオ公開の16秒後にYoutubeのおすすめに出てきて運命を感じた。
                    </p>
                    <div className="w-full flex overflow-x-auto gap-2 p-4">
                        <iframe className='flex-shrink-0' width="560" height="315" src="https://www.youtube.com/embed/ZUwaudw8ht0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                    <p>
                        気付けばファン歴を重ねて、アフロ☆サムライのファンに。
                        推し曲は全て。
                        一番好きなのは
                        <Link className='link-primary' href="https://www.youtube.com/watch?v=ZUwaudw8ht0">
                            あいつら全員同窓会
                        </Link>
                        と
                        <Link className='link-primary' href="https://www.youtube.com/watch?v=I88PrE-KUPk">
                            MILABO
                        </Link>
                        。
                    </p>
                    <div className="w-full flex overflow-x-auto gap-2 p-4">
                        <iframe className='flex-shrink-0' width="560" height="315" src="https://www.youtube.com/embed/ZUwaudw8ht0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                        <iframe className='flex-shrink-0' width="560" height="315" src="https://www.youtube.com/embed/I88PrE-KUPk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                    <p>
                        ライブは
                        2022年の
                        <Link href="https://zutomayo.net/special/technopoor/">
                            テクノプア
                        </Link>
                        名古屋店に参戦。
                        <br />
                        もっと参戦したい。
                    </p>
                    <p>
                        Twitterは
                        <Link href="https://twitter.com/tsuba__zutomaro" target='_blank'>
                            こちら
                        </Link>
                        。
                    </p>
                </div>
            </Container>
        </LayoutContent>
    );
}

interface EngineerChannelProps {
}
const EngineerChannel: FC<EngineerChannelProps> = () => {
    return (
        <LayoutContent className={styles["section"]}>
            <Container>
                <SectionTitle href="https://www.youtube.com/@user-er2rz1lp1n">
                    エンジニアチャンネル
                </SectionTitle>
                <div className="md:pl-4">
                    <p>
                        エンジニア系Youtuberです。
                    </p>
                    <p>
                        時々メンバの
                        <Link href="https://twitter.com/ogaaryo" className='link-primary'>
                            小川さん
                        </Link>
                        のTwitterスペースに現れてはリプライを飛ばしています。
                    </p>
                    <div className="w-full flex overflow-x-auto gap-2 p-4">
                        <iframe className='flex-shrink-0' width="560" height="315" src="https://www.youtube.com/embed/pDWgh-EpYck" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                </div>
            </Container>
        </LayoutContent>
    );
}
