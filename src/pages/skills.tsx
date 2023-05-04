import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { dummySkills } from '@/skill/dummy';
import { Skill } from '@/skill/type';
import { NextPage } from 'next';
import Image from 'next/image';
import { FC } from 'react';
import { BsFillStarFill, BsStar } from 'react-icons/bs';

interface Props {
}
const SkillsPage: NextPage<Props> = ({ }) => {
    const skills = dummySkills
    return (
        <BasicLayout>
            <PageTitle>
                スキル
            </PageTitle>
            <LayoutContent className='bg-base-200'>
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {skills.map(skill =>
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

interface SkillCardProps {
    skill: Skill
}
const SkillCard: FC<SkillCardProps> = ({ skill }) => {
    return (
        <div className='p-2 md:p-4 rounded bg-base-100 hover:shadow hover:-translate-y-1 duration-300'>
            <div className="">
                <div className="mt-2 mb-4 font-bold text-lg flex flex-row items-center">
                    <Image
                        className="mr-2 w-10 h-10 object-contain"
                        src={skill.icon}
                        alt={skill.name}
                        width={50} height={50}
                    />
                    <span className="flex-grow ">
                        {skill.name}
                    </span>
                </div>
                <div className="flex flex-row flex-wrap gap-1 justify-end my-2">
                    <div className="badge badge-outline badge-secondary">
                        {Array.from({ length: skill.assessment }, (_, i) =>
                            <BsFillStarFill className="text-secondary" key={i} />
                        )}
                        {Array.from({ length: skill.assessmentMax - skill.assessment }, (_, i) =>
                            <BsStar key={i} />
                        )}
                    </div>
                    {skill.interest &&
                        <div className="badge badge-primary">興味あり</div>
                    }
                </div>
                <div className="flex flex-row flex-wrap gap-1 justify-end my-2">
                    {skill.tags.map(tag =>
                        <div className="badge badge-outline" key={tag}>
                            {tag}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

