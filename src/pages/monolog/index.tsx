import Loading from '@/components/Loading';
import MarkdownText from '@/components/MarkdownText';
import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useMonologList } from '@/monolog/client';
import { Monolog } from '@/monolog/type';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { FC } from 'react';

interface Props {
}
const MonologListPage: NextPage<Props> = ({ }) => {
    const { monologList, isLoading } = useMonologList({ sortBy: "publishAt", filter: "onlyPublished", })
    return (
        <>
            <MonologListHead />
            <BasicLayout>
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
            </BasicLayout>
        </>
    );
}
export default MonologListPage;

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
    return (
        <div className='p-2 border border-secondary my-2' id={monolog.slug}>
            <MarkdownText
                markdown={monolog.content}
            />
            <div className="p-2 text-end text-sm">
                {dayjs(monolog.publishAt).format("MM月DD日 hh:mm")}
            </div>
        </div>
    );
}
