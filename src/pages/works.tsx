import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useWorks } from '@/work/client';
import WorkCard from '@/work/components/WorkCard';
import { NextPage } from 'next';

interface Props {
}
const WorksPage: NextPage<Props> = ({ }) => {
    const { works } = useWorks()
    return (
        <BasicLayout>
            <PageTitle>
                作ったもの
            </PageTitle>
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
        </BasicLayout>
    );
}
export default WorksPage;
