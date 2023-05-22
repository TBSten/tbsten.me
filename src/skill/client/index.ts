import { useQuery } from "@tanstack/react-query";
import { Skill, SkillSchema } from "../type";

export const fetchSkills = () => fetch("/api/skill")
    .then(r => r.json())
    .then(r => SkillSchema.array().parse(r))

export function useSkills({ onSuccess, default: defaultSkills }: {
    onSuccess?: (skills: Skill[]) => void
    default?: Skill[]
} = {}) {
    const { data: skills, isLoading } = useQuery({
        queryKey: ["skills"],
        queryFn: fetchSkills,
        cacheTime: 60 * 60 * 1000,
        onSuccess,
        initialData: defaultSkills,
    })
    return {
        skills,
        isLoading,
    } as const
}
