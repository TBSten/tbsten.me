import { dummyArticles } from '@/article/dummy';
import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
}
const ArticleTopPage: NextPage<Props> = ({ }) => {
    const articles = dummyArticles
    return (
        <BasicLayout
            headerAction={<Link href="/articles" className='btn btn-sm'>
                ARTICLES
            </Link>}
        >
            <PageTitle>
                Articles
            </PageTitle>
            <div className='divider' />
            <LayoutContent>
                <Container>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 w-full">
                        {articles.map(article =>
                            <Link href={article.link} target='_blank' className="shadow bg-base-100 rounded-t-xl rounded-b-2xl overflow-hidden  transition-all duration-500 hover:scale-110 pb-2" key={article.link}>
                                <Image
                                    src={article.ogImage}
                                    alt={article.title}
                                    width={300}
                                    height={300}
                                    style={{ width: "100%", height: "auto" }}
                                />
                                <div className="p-2">
                                    {article.title.substring(0, 30)}
                                    {article.title.length >= 30 && "..."}
                                </div>
                                <div className="p-2 text-end italic">
                                    publish at
                                    {" "}
                                    {dayjs(article.publishAt).format("YYYY/M")}
                                </div>
                            </Link>
                        )}
                    </div>
                </Container>
            </LayoutContent>
        </BasicLayout>
    );
}
export default ArticleTopPage;
