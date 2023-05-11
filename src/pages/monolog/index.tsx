import { useCopy } from '@/client/copy';
import Loading from '@/components/Loading';
import MarkdownCacheProvider from '@/components/MarkdownCacheProvider';
import MarkdownText from '@/components/MarkdownText';
import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useMonologList } from '@/monolog/client';
import { getMonologList } from '@/monolog/server';
import { Monolog } from '@/monolog/type';
import dayjs from 'dayjs';
import { GetServerSideProps, NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import markdownToHtml from 'zenn-markdown-html';

interface Props {
    monologList: Monolog[]
    markdowns: Record<string, string>
}
const MonologListPage: NextPage<Props> = ({ monologList: defaultMonologList, markdowns, }) => {
    const { monologList, isLoading } = useMonologList({
        sortBy: "publishAt",
        filter: "onlyPublished",
        default: defaultMonologList,
    })
    return (
        <>
            <MonologListHead />
            <BasicLayout>
                <MarkdownCacheProvider markdowns={markdowns}>
                    <PageTitle>
                        独り言
                    </PageTitle>
                    <LayoutContent>
                        {isLoading &&
                            <Loading />
                        }
                        {monologList?.map(monolog =>
                            <MonologCard
                                key={monolog.slug}
                                monolog={monolog}
                            />
                        )}
                    </LayoutContent>
                    <div className="h-[50vh]" />
                </MarkdownCacheProvider>
            </BasicLayout>
        </>
    );
}
export default MonologListPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const monologList = await getMonologList({
        sortBy: "publishAt",
        filter: "onlyPublished",
    })
    const markdowns = monologList.reduce((mds, monolog) => {
        mds[monolog.content] = markdownToHtml(monolog.content)
        return mds
    }, {} as Record<string, string>)
    return {
        props: {
            monologList,
            markdowns,
        }
    }
}

interface MonologListHeadProps {
}
const MonologListHead: FC<MonologListHeadProps> = () => {
    return (
        <PageHead
            path="/monolog"
            title="独り言 | TBSten"
            description="TBStenの独り言です。"
        />
    );
}


interface MonologCardProps {
    monolog: Monolog
}
const MonologCard: FC<MonologCardProps> = ({ monolog }) => {
    const { copy, isCoping, isSuccess: _isSuccess, isError } = useCopy()
    const [isSuccess, setIsSuccess] = useState(_isSuccess)
    useEffect(() => {
        let clear = setTimeout(() => {
            setIsSuccess(false)
        }, 5000)
        if (_isSuccess)
            setIsSuccess(_isSuccess)
        return () => {
            clearTimeout(clear)
        }
    }, [_isSuccess])
    return (
        <div className='p-2 border border-secondary my-2' id={monolog.slug}>
            <MarkdownText
                markdown={monolog.content}
            />
            <div className="p-2 flex justify-between items-center text-sm">
                <div>
                    <button className="btn btn-ghost btn-circle btn-sm md:btn-md" onClick={() => copy(`https://tbsten.me/monolog#${monolog.slug}`)}>
                        <BiCopy />
                    </button>
                </div>
                <span>
                    {dayjs(monolog.publishAt).format("MM月DD日 hh:mm")}
                </span>
            </div>
            {isCoping &&
                <div className="toast toast-start toast-bottom">
                    <div className="alert shadow alert-info">
                        <Loading />
                    </div>
                </div>
            }
            {isSuccess &&
                <div className="toast toast-start toast-bottom">
                    <div className="alert shadow alert-success">
                        URLをコピーしました!
                    </div>
                </div>
            }
            {isError &&
                <div className="toast toast-start toast-bottom">
                    <div className="alert shadow alert-error">
                        コピーできませんでした...
                    </div>
                </div>
            }
        </div>
    );
}
