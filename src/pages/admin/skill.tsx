import { AdminMenuSection } from '@/admin/components/AdminMenu';
import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { ssrOfRequireAuth } from '@/server/ssr';
import { SkillsEditor } from '@/skill/components/editor/SkillsEditor';
import { Skill } from '@/skill/type';
import { useMutation } from '@tanstack/react-query';
import { NextPage } from 'next';

interface Props {
}
const AdminSkillPage: NextPage<Props> = ({ }) => {
    const { mutateAsync: saveSkills, isLoading: isSaving } = useMutation({
        mutationFn: (input: Skill[]) => fetch("/api/skill", {
            method: "PUT",
            body: JSON.stringify(input),
        }).then(r => {
            if (!r.ok) throw new Error("cannot save !")
        })
    })
    return (
        <BasicLayout>
            <PageTitle>
                Admin:
                スキル
            </PageTitle>

            <AdminMenuSection />

            <LayoutContent className='bg-base-200'>
                <Container>
                    <SkillsEditor
                        onSave={saveSkills}
                    />
                </Container>
            </LayoutContent>
        </BasicLayout>
    );
}
export default AdminSkillPage;

export const getServerSideProps = ssrOfRequireAuth()
