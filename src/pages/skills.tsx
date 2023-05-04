import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useSkills } from '@/skill/client';
import { SkillCard } from '@/skill/components/SkillCard';
import { NextPage } from 'next';

interface Props {
}
const SkillsPage: NextPage<Props> = ({ }) => {
    const { skills, isLoading, } = useSkills()
    return (
        <BasicLayout>
            <PageTitle>
                スキル
            </PageTitle>
            <LayoutContent className='bg-base-200'>
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {skills?.map(skill =>
                            <SkillCard key={skill.name}
                                skill={skill}
                            />
                        )}
                    </div>
                </Container>
            </LayoutContent>
            <div className="divider"></div>
        </BasicLayout>
    );
}
export default SkillsPage;


