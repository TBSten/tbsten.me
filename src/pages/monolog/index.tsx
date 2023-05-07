import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useMarkdownToHtml } from '@/markdown/client';
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
        <BasicLayout>
            <PageTitle>
                独り言
            </PageTitle>
            <LayoutContent>
                {monologList?.map(monolog =>
                    <MonologCard
                        key={monolog.slug}
                        monolog={monolog}
                    />
                )}
            </LayoutContent>
        </BasicLayout>
    );
}
export default MonologListPage;

interface MonologCardProps {
    monolog: Monolog
}
const MonologCard: FC<MonologCardProps> = ({ monolog }) => {
    const { html, isLoading } = useMarkdownToHtml(monolog.publishedContent ?? "")
    return (
        <div className='p-2 border border-secondary my-2'>
            <div className='znc' dangerouslySetInnerHTML={{
                __html: html ?? "",
            }} />
            <div className="p-2 text-end text-sm">
                {dayjs(monolog.publishAt).format("MM月DD日 hh:mm")}
            </div>
        </div>
    );
}