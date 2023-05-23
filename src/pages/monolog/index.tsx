import { useCopy } from '@/client/copy';
import { useHash } from '@/client/hash';
import Dialog, { useDialog } from '@/components/Dialog';
import Loading from '@/components/Loading';
import MarkdownCacheProvider from '@/components/MarkdownCacheProvider';
import MarkdownText from '@/components/MarkdownText';
import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { createMarkdownCache } from '@/markdown/cache';
import { md } from '@/markdown/shortcut';
import { useMonologList } from '@/monolog/client';
import { getMonologList } from '@/monolog/server';
import { Monolog } from '@/monolog/type';
import classNames from 'classnames';
import dayjs from 'dayjs';
import dedent from 'dedent-js';
import { GetServerSideProps, NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';

const apiRouteIndex = "/api/monolog"
const apiRouteRandom = "/api/monolog/random"

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

    const hash = useHash()

    const apiDialog = useDialog()
    return (
        <>
            <MonologListHead />
            <BasicLayout>
                <MarkdownCacheProvider markdowns={markdowns}>
                    <PageTitle>
                        独り言
                    </PageTitle>
                    <LayoutContent>
                        <div className='flex justify-end'>
                            <button className="btn btn-outline btn-primary" onClick={apiDialog.show}>
                                APIを表示
                            </button>
                        </div>
                    </LayoutContent>
                    <LayoutContent>
                        {isLoading &&
                            <Loading />
                        }
                        {monologList?.map(monolog =>
                            <MonologCard
                                key={monolog.slug}
                                monolog={monolog}
                                selected={hash === monolog.slug}
                            />
                        )}
                    </LayoutContent>
                    <div className="h-[50vh]" />
                    <Dialog {...apiDialog.dialogProps}>
                        <div className="text-xl font-bold">
                            公開API
                        </div>
                        <div className="">
                            <MarkdownText
                                markdown={dedent`
                                # [${apiRouteIndex}](${apiRouteIndex})

                                ${md.cb("shell:curl", `
                                curl https://tbsten.me${apiRouteIndex}
                                `)}
                                ${md.cb("js:JavaScript", `
                                const skills = await fetch("https://tbsten.me${apiRouteIndex}")
                                    .then(r=>r.json())
                                `)}

                                # [${apiRouteRandom}](${apiRouteRandom})
                                
                                ${md.cb("shell:curl", `
                                curl https://tbsten.me${apiRouteRandom}
                                `)}
                                ${md.cb("js:JavaScript", `
                                const skills = await fetch("https://tbsten.me${apiRouteRandom}")
                                    .then(r=>r.json())
                                `)}

                                `}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="btn" onClick={apiDialog.hide}>
                                閉じる
                            </button>
                        </div>
                    </Dialog>
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
    return {
        props: {
            monologList,
            markdowns: createMarkdownCache(...monologList.map(monolog => monolog.content)),
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
    selected?: boolean
}
const MonologCard: FC<MonologCardProps> = ({ monolog, selected = false }) => {
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
        <div className={classNames(
            'border-secondary my-2',
            selected ? "border-4" : "border",
        )} id={monolog.slug}>

            <div className="p-2">
                <MarkdownText
                    markdown={monolog.content}
                />
            </div>
            <div className="px-1 md:p-2 md:px-2 flex justify-between items-center text-sm">
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
                <div className="toast toast-start toast-bottom z-50">
                    <div className="alert shadow alert-info">
                        <Loading />
                    </div>
                </div>
            }
            {isSuccess &&
                <div className="toast toast-start toast-bottom z-50">
                    <div className="alert shadow alert-success">
                        URLをコピーしました!
                    </div>
                </div>
            }
            {isError &&
                <div className="toast toast-start toast-bottom z-50">
                    <div className="alert shadow alert-error">
                        コピーできませんでした...
                    </div>
                </div>
            }
        </div>
    );
}
