import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useSkills } from '@/skill/client';
import { SkillCard } from '@/skill/components/SkillCard';
import { getSkills } from '@/skill/server';
import { Skill } from '@/skill/type';
import { GetServerSideProps, NextPage } from 'next';
import { FC } from 'react';

interface Props {
    skills: Skill[]
}
const SkillsPage: NextPage<Props> = ({ skills: defaultSkills }) => {
    const { skills, isLoading, } = useSkills({ default: defaultSkills })
    return (
        <>
            <SkillsHead />
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
        </>
    );
}
export default SkillsPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const skills = await getSkills()
    return {
        props: { skills }
    }
}

interface SkillsHeadProps {
}
const SkillsHead: FC<SkillsHeadProps> = () => {
    return (
        <PageHead
            path='/pages'
            title='スキル | TBSten'
            description='TBStenのスキルが閲覧できるページです。'
        />
    );
}



