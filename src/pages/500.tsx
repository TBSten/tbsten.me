import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
}
const InternalServerError: NextPage<Props> = ({ }) => {
    return (
        <BasicLayout className='bg-error text-error-content'>
            <PageTitle>
                Error: 500 Internal Server Error !
            </PageTitle>
            <LayoutContent>
                予期しないエラーが発生しました。管理者に連絡してください。
            </LayoutContent>
            <LayoutContent>
                <Link href="https://twitter.com/tbs__ten" className='link link-primary text-xl my-2 mx-4'>
                    管理者に連絡する
                </Link>
                <Link href="/" className='link link-primary text-xl my-2 mx-4'>
                    TOPへ
                </Link>
            </LayoutContent>
        </BasicLayout>
    );
}
export default InternalServerError;
