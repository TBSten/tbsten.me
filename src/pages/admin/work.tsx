import { AdminMenuSection } from '@/admin/components/AdminMenu';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { NextPage } from 'next';

interface Props {
}
const AdminWorksPage: NextPage<Props> = ({ }) => {
    return (
        <BasicLayout>
            <PageTitle>
                Admin:
                作ったもの
            </PageTitle>

            <AdminMenuSection />

            <LayoutContent>
                作ったもの
            </LayoutContent>
        </BasicLayout>
    );
}
export default AdminWorksPage;
