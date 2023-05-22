import MarkdownCacheProvider from '@/components/MarkdownCacheProvider';
import MarkdownText from '@/components/MarkdownText';
import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { createMarkdownCache } from '@/markdown/cache';
import { aboutApiText } from '@/server/about-api';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
    markdowns: Record<string, string>
}
const AboutApiPage: NextPage<Props> = ({ markdowns }) => {
    return (
        <>
            <AboutApiHead />
            <MarkdownCacheProvider markdowns={markdowns}>
                <BasicLayout>
                    <PageTitle>
                        公開APIについて
                    </PageTitle>
                    <LayoutContent>
                        <p>
                            当サイトの情報の一部をREST APIとして公開しています。
                            <Link href="#note" className='link link-primary'>
                                注意
                            </Link>
                            をお読みの上
                            自由にお使いください。
                        </p>
                        <p>
                            機能リクエストなどあれば
                            <Link
                                href="https://github.com/TBSten/tbsten.me/issues" target='_blank'
                                className='link link-primary'
                            >
                                Githubのissue
                            </Link>
                            までお願いします。
                        </p>
                    </LayoutContent>
                    <LayoutContent>
                        <ApiDetail />
                    </LayoutContent>
                    <LayoutContent>
                    </LayoutContent>
                    <LayoutContent id="note">
                        <h2 className='font-bold text-xl'>
                            注意
                        </h2>
                        <p>
                            サイト更新時などに予告なく仕様が変更される可能性もありますが、
                            その場合なるべく速く当ページにも仕様を記載するように努力します。
                        </p>
                        <p>
                            常識の範囲内でのリクエストをお願いします。
                            (ｸﾗｳﾄﾞﾊｻﾝｼﾀｸﾅｲﾖ
                        </p>
                        <p>
                            なお以下に記載していない管理用APIも存在します(アクセスはできません)。
                        </p>
                    </LayoutContent>
                </BasicLayout>
            </MarkdownCacheProvider>
        </>
    );
}
export default AboutApiPage;

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    return {
        props: {
            markdowns: createMarkdownCache(apiDetail),
        },
    }
}

interface AboutApiHeadProps {
}
const AboutApiHead: FC<AboutApiHeadProps> = () => {
    return (
        <PageHead
            path='/about-api'
            title='公開API | TBSten'
            description='本サイトで使用しているREST APIを一部公開しています。'
        />
    );
}

interface ApiDetailProps {
}
const ApiDetail: FC<ApiDetailProps> = () => {
    return (
        <div>
            <MarkdownText
                markdown={apiDetail}
            />
        </div>
    );
}

const apiDetail = aboutApiText
