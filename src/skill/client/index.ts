import { useQuery } from "@tanstack/react-query";
import { SkillSchema } from "../type";

export function useSkills() {
    const { data: skills, isLoading, } = useQuery({
        queryKey: ["skills"],
        queryFn: () => fetch("/api/skill")
            .then(r => r.json())
            .then(r => SkillSchema.array().parse(r)),
        cacheTime: 60 * 60 * 1000,
    })
    return {
        skills,
        isLoading,
    } as const
}
