import Loading from "@/components/Loading";
import { fetchSkills } from "@/skill/client";
import { Skill, SkillSchema } from "@/skill/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SkillItemEditor } from "./SkillItemEditor";

const Schema = z.object({
    skills: SkillSchema.array().nullable(),
})


export interface SkillsEditorProps {
    onSave: (skills: Skill[]) => void
}
export const SkillsEditor: FC<SkillsEditorProps> = ({
    onSave,
}) => {
    const { setValue, watch } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: { skills: [] }
    })
    useEffect(() => {
        (async () => {
            const skills = await fetchSkills()
            setValue("skills", skills)
        })()
    }, [setValue])
    const skills = watch("skills")

    const handleAdd = () => {
        const p = watch("skills")
        if (!p) return
        setValue("skills", [...p, {
            name: "",
            icon: "https://storage.googleapis.com/tbsten-me-public-content/skill.png",
            tags: [],
            interest: false,
            assessment: 0,
            assessmentMax: 4,
            learnStartYear: new Date().getFullYear(),
        }])
    }
    const handleShift = (from: number, dir: "prev" | "next") => {
        const p = watch("skills")
        if (!p) return
        const shiftTar = dir === "prev" ? from - 1 : from + 1
        if (!p[shiftTar]) return
        const newSkills = [...p]
        const w = newSkills[from]
        newSkills[from] = newSkills[shiftTar]
        newSkills[shiftTar] = w
        setValue("skills", newSkills)
    }
    const handleNewTag = (i: number) => () => {
        const p = watch("skills")
        if (!p) return
        setValue(`skills.${i}.tags`, [...p[i].tags, ""])
    }
    const handleChangeTag = (skillIdx: number) => (tagIdx: number, tag: Skill["tags"][number]) => {
        setValue(`skills.${skillIdx}.tags.${tagIdx}`, tag)
    }
    const handleDeleteTag = (skillIdx: number) => (tagIdx: number) => {
        const key = `skills.${skillIdx}.tags` as const
        const p = watch(`skills.${skillIdx}.tags`)
        setValue(key, p.filter((t, i) => i !== tagIdx))
    }
    const handleDelete = (skillIdx: number) => () => {
        setValue("skills", watch("skills")?.filter((_, i) => i !== skillIdx) ?? null)
    }
    if (!skills) {
        return <Loading />
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            {skills.map((skill, i) =>
                <SkillItemEditor key={i}
                    {...{ skill }}
                    onChangeName={(name) => setValue(`skills.${i}.name`, name)}
                    onChangeIcon={(icon) => setValue(`skills.${i}.icon`, icon)}
                    onChangeAssessment={(assessment) => setValue(`skills.${i}.assessment`, assessment)}
                    onChangeAssessmentMax={(assessmentMax) => setValue(`skills.${i}.assessmentMax`, assessmentMax)}
                    onToggleInterest={() => {
                        const key = `skills.${i}.interest` as const
                        setValue(key, !watch(key))
                    }}
                    onChangeLearnStartYear={(learnStartYear) => setValue(`skills.${i}.learnStartYear`, learnStartYear)}
                    onNewTag={handleNewTag(i)}
                    onChangeTag={handleChangeTag(i)}
                    onDeleteTag={handleDeleteTag(i)}
                    onShift={(dir) => handleShift(i, dir)}
                    onDelete={handleDelete(i)}
                />
            )}
            <div className="px-4 py-2">
                <button className="btn btn-outline btn-primary w-full" onClick={handleAdd}>
                    追加
                </button>
            </div>
            <button className="btn btn-accent shadow fixed bottom-8 right-2 rounded-full" onClick={() => {
                const skills = watch("skills")
                if (!skills) return
                onSave(skills)
            }}>
                <span className="px-8">
                    保存
                </span>
            </button>
        </div>
    );
}

