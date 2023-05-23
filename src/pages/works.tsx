import Dialog, { useDialog } from '@/components/Dialog';
import MarkdownText from '@/components/MarkdownText';
import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { md } from '@/markdown/shortcut';
import { useWorks } from '@/work/client';
import WorkCard from '@/work/components/WorkCard';
import { getWorks } from '@/work/server';
import { Work } from '@/work/type';
import dedent from 'dedent-js';
import { GetServerSideProps, NextPage } from 'next';
import { FC } from 'react';

const apiRoute = "/api/work"

interface Props {
    works: Work[]
}
const WorksPage: NextPage<Props> = ({ works: defaultWorks }) => {
    const { works } = useWorks({ default: defaultWorks })
    const apiDialog = useDialog()
    return (
        <>
            <WorksHead />
            <BasicLayout>
                <PageTitle>
                    作ったもの
                </PageTitle>
                <LayoutContent>
                    <div className="flex justify-end">
                        <button className="btn btn-outline btn-primary" onClick={apiDialog.show}>
                            APIを表示
                        </button>
                    </div>
                </LayoutContent>
                <LayoutContent>
                    <div className="flex flex-row">
                        <div className="px-4 flex flex-col ">
                            {works?.map(work =>
                                <a href={`#${work.title.replaceAll(/\s/g, "_")}`} className="btn btn-ghost btn-circle font-main rounded-full" key={work.link}>
                                    {work.title.substring(0, 1)}
                                </a>
                            )}
                        </div>
                        <div className="flex-grow border-l border-base-200">
                            {works?.map(work =>
                                <div className="" id={work.title.replaceAll(/\s/g, "_")} key={work.link}>
                                    <WorkCard
                                        work={work}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </LayoutContent>
                <Dialog {...apiDialog.dialogProps}>
                    <div className="text-xl font-bold">
                        公開API
                    </div>
                    <div className="">
                        <MarkdownText
                            markdown={dedent`
                                # [${apiRoute}](${apiRoute})
                                
                                ${md.cb("shell:curl", `
                                curl https://tbsten.me${apiRoute}
                                `)}
                                ${md.cb("js:JavaScript", `
                                const skills = await fetch("https://tbsten.me${apiRoute}")
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
            </BasicLayout>
        </>
    );
}
export default WorksPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const works = await getWorks()
    return {
        props: {
            works,
        }
    }
}

interface WorksHeadProps {
}
const WorksHead: FC<WorksHeadProps> = () => {
    return (
        <PageHead
            path='/pages'
            title='作ったもの | TBSten'
            description='TBStenが作ったものが閲覧できるページです。'
        />
    );
}

