import { useConfirm } from "@/components/ConfirmDialog"
import ImageEditor, { useImageEditor } from "@/components/ImageEditor"
import { Skill } from "@/skill/type"
import React, { FC } from "react"
import { SkillCard, SkillCardIcon } from "../SkillCard"
import { AssessmentEditor } from "./AssessmentEditor"
import { InterestEditor } from "./InterestEditor"
import { TagsEditor } from "./TagsEditor"

export interface SkillItemEditorProps {
    skill: Skill
    onChangeName: (name: string) => void
    onChangeIcon: (icon: string) => void
    onChangeAssessment: (assessment: Skill["assessment"]) => void
    onChangeAssessmentMax: (assessment: Skill["assessmentMax"]) => void
    onToggleInterest: () => void
    onChangeLearnStartYear: (learnStartYear: Skill["learnStartYear"]) => void
    onShift: (dir: "prev" | "next") => void
    onNewTag: () => void
    onChangeTag: (i: number, tag: Skill["tags"][number]) => void
    onDeleteTag: (i: number) => void
    onDelete: () => void
}
const SkillItemEditorContent: FC<SkillItemEditorProps> = ({
    skill,
    onChangeName, onChangeIcon,
    onChangeAssessment,
    onChangeAssessmentMax,
    onShift,
    onToggleInterest,
    onChangeLearnStartYear,
    onNewTag, onChangeTag, onDeleteTag,
    onDelete,
}) => {
    const deleteConfirm = useConfirm(() => { onDelete() })
    const imageEditor = useImageEditor()
    return (
        <div className="my-8 md:mx-4 md:my-4">
            <SkillCard
                skill={skill}
                icon={
                    <button className="hover:brightness-50" onClick={imageEditor.show}>
                        <SkillCardIcon
                            {...skill}
                        />
                    </button>
                }
                name={
                    <input
                        className='input input-bordered w-full'
                        value={skill.name}
                        onChange={e => onChangeName(e.target.value)}
                    />
                }
                primaryTags={
                    <>
                        <AssessmentEditor
                            {...skill}
                            {...{ onChangeAssessment, onChangeAssessmentMax }}
                        />
                        <InterestEditor
                            {...skill}
                            onToggle={onToggleInterest}
                        />
                    </>
                }
                secondaryTags={
                    <>
                        <TagsEditor
                            {...skill}
                            onNew={onNewTag}
                            onChange={onChangeTag}
                            onDelete={onDeleteTag}
                        />
                    </>
                }
                actions={
                    <div className="flex flex-col">
                        <div className="flex justify-end items-center flex-wrap">
                            <label className="text-sm">
                                学習開始年
                            </label>
                            <div className="flex justify-end items-center pl-2">
                                <input
                                    type="text"
                                    className="input input-bordered w-[6rem] max-w-full text-right"
                                    // defaultValue={new Date().getFullYear()}
                                    value={skill.learnStartYear?.toString() ?? ""}
                                    onChange={e => {
                                        const newValue = parseInt(e.target.value)
                                        onChangeLearnStartYear(isNaN(newValue) ? null : newValue)
                                    }}
                                />
                                年
                            </div>
                        </div>
                        <div className='flex justify-between flex-wrap mt-4'>
                            <div className="flex gap-1">
                                <div className="md:-rotate-90">
                                    <button className="btn btn-outline btn-square" onClick={() => onShift("prev")}>
                                        ↑
                                    </button>
                                </div>
                                <div className="md:-rotate-90">
                                    <button className="btn btn-outline btn-square" onClick={() => onShift("next")}>
                                        ↓
                                    </button>
                                </div>
                            </div>
                            <div className="">
                                <button className="btn btn-error" onClick={() => deleteConfirm.confirm(`${skill.name} を削除してもいいですか？`)}>
                                    削除
                                </button>
                            </div>
                        </div>
                    </div>
                }
                floatOnHover={false}
            />
            <ImageEditor
                src={skill.icon}
                onChange={(img) => img && onChangeIcon(img)}
                {...imageEditor.imageEditorProps}
            />
            {deleteConfirm.content}
        </div>
    );
}

export const SkillItemEditor = React.memo(SkillItemEditorContent)

