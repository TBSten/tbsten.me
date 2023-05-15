import Center from '@/components/Center';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
}
const NotFound: NextPage<Props> = ({ }) => {
    const router = useRouter()
    return (
        <BasicLayout>
            <LayoutContent>
                <Center className='min-h-[70vh]'>
                    <div className='text-5xl font-dot font-bold mt-2 mb-4'>
                        404 Not Found !
                    </div>
                    <div className='my-8'>
                        指定されたURLは見つからなかったか削除されたページです。
                        URLが正しいか確認してください。
                    </div>
                    <Link href="/" className='btn btn-link text-xl'>
                        TOPへ
                    </Link>
                </Center>
            </LayoutContent>
        </BasicLayout>
    );
}
export default NotFound;
