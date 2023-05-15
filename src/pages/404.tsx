import Center from '@/components/Center';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
}
const NotFound: NextPage<Props> = ({ }) => {
    const router = useRouter()
    return (
        <BasicLayout className='bg-error text-error-content'>
            <PageTitle>
                Error: 404 Not Found !
            </PageTitle>
            <LayoutContent>
                <Center>
                    <div className='my-8'>
                        指定されたURLは見つからなかったか削除されたページです。
                        URLが正しいか確認してください。
                    </div>
                    <Link href="/" className='link link-primary text-xl my-2 mx-4'>
                        TOPへ
                    </Link>
                </Center>
            </LayoutContent>
        </BasicLayout>
    );
}
export default NotFound;
