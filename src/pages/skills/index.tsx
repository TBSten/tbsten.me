import { useHash } from '@/client/hash';
import Center from '@/components/Center';
import Loading from '@/components/Loading';
import PageHead from '@/components/PageHead';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useSkills } from '@/skill/client';
import { SkillCard, SkillCardPrimaryTags } from '@/skill/components/SkillCard';
import { getSkills } from '@/skill/server';
import { Skill } from '@/skill/type';
import classNames from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';

interface Props {
    skills: Skill[]
}
const SkillsPage: NextPage<Props> = ({ skills: defaultSkills }) => {
    const [tab, setTab] = useState<"all" | "history">("all")
    const { skills, isLoading, } = useSkills({ default: defaultSkills })
    const hash = useHash()
    useEffect(() => {
        if (hash && !isNaN(parseInt(hash))) {
            setTab("history")
            setTimeout(() => {
                document.getElementById(hash)?.scrollIntoView()
            }, 50)
        }
    }, [hash])
    return (
        <>
            <SkillsHead />
            <BasicLayout>
                <PageTitle>
                    スキル
                </PageTitle>
                <LayoutContent>
                    <Center>
                        <div className="tabs tabs-boxed">
                            <div className={classNames(
                                "tab md:tab-lg transition-all duration-200",
                                { "tab-active": tab === "all" }
                            )} onClick={() => setTab("all")}>
                                All
                            </div>
                            <div className={classNames(
                                "tab md:tab-lg transition-all duration-200",
                                { "tab-active": tab === "history" }
                            )} onClick={() => setTab("history")}>
                                History
                            </div>
                        </div>
                    </Center>
                </LayoutContent>

                {tab === "all" &&
                    <AllSkillsSection
                        {...{ skills, isLoading }}
                    />
                }

                {tab === "history" &&
                    <SkillsHistorySection
                        {...{ skills, isLoading }}
                    />
                }

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


interface AllSkillsSectionProps {
    skills: Skill[]
    isLoading: boolean
}
const AllSkillsSection: FC<AllSkillsSectionProps> = ({ skills, isLoading }) => {
    return (
        <LayoutContent className='bg-base-200'>
            <div className="text-xl md:text-4xl font-bold text-center mt-2 mb-4">
                スキル一覧
            </div>
            {isLoading
                ? <Loading />
                : <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skills?.map(skill =>
                        <SkillCard key={skill.name}
                            skill={skill}
                        />
                    )}
                </div>
            }
        </LayoutContent>
    );
}

const grades = new Map<number, ReactNode>([
    [2018, "高校 1年生"],
    [2019, "高校 2年生"],
    [2020, "高校 3年生"],
    [2021, "専門学校 1年生"],
    [2022, "専門学校 2年生"],
    [2023, "専門学校 3年生"],
    [2024, "社会人 1年生"],
    [2025, "社会人 2年生"],
    [2026, "社会人 3年生"],
] as const)

interface SkillsHistorySectionProps {
    skills: Skill[]
    isLoading: boolean
}
const SkillsHistorySection: FC<SkillsHistorySectionProps> = ({ skills, isLoading }) => {
    const groupedByYear = useMemo(() => {
        const grouped = skills.reduce((map, skill) => {
            if (!skill.learnStartYear) return map
            const prev = map.get(skill.learnStartYear)
            if (prev) {
                prev.push(skill)
            } else {
                map.set(skill.learnStartYear, [skill])
            }
            return map
        }, new Map<number, Skill[]>())
            .entries()
        const sorted = Array.from(grouped).sort((a, b) => a[0] - b[0])
        return sorted
    }, [skills])
    return (
        <LayoutContent className='bg-base-200 '>
            <div className="text-xl md:text-4xl font-bold text-center mt-2 mb-4">
                触り始めた時期
            </div>
            <div className="grid grid-cols-[auto,1fr] md:gap-x-2">

                {groupedByYear.map(([year, skills], idx) =>
                    <React.Fragment key={year}>
                        <div className="flex flex-col items-center justify-start p-0" id={`${year}`}>
                            <div className="p-2">
                                <span className='text-sm md:text-base bg-primary text-primary-content aspect-square p-1 flex justify-center items-center rounded-full'>
                                    {year}
                                </span>
                            </div>
                            <div className='w-full h-full flex justify-center'>
                                <div className={classNames(
                                    "w-[3px] h-full bg-primary animate-pulse ",
                                    { "animation-delay-1000": idx % 2 === 1 },
                                )} />
                            </div>
                        </div>
                        <div className="flex flex-col pb-12 md:pb-16">
                            <div className="font-bold pb-2 pt-4 px-2 text-center sm:text-start divider">
                                {grades.get(year) ?? ""}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 md:gap-2 ">
                                {skills.map(skill =>
                                    <SkillCard key={skill.name}
                                        skill={skill}
                                        primaryTags={
                                            <SkillCardPrimaryTags
                                                {...skill}
                                                disableAssessment
                                            />
                                        }
                                    />
                                )}
                            </div>
                        </div>

                    </React.Fragment>
                )}

                {/* continue */}
                <div className="col-start-1 col-end-3 text-center p-2">
                    <div className="border-2 border-primary rounded py-2 bg-base-100">
                        continue to future ...
                    </div>
                </div>

            </div>
        </LayoutContent>
    );
}
