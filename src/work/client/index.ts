import { useMutation, useQuery } from "@tanstack/react-query";
import { Work, WorkSchema } from "../type";

export const fetchWorks = () => fetch(`/api/work`)
    .then(r => r.json())
    .then(r => WorkSchema.array().parse(r))

export function useWorks({ default: defalutWorks }: { default?: Work[] } = {}) {
    const { data: works, isLoading, } = useQuery({
        queryKey: ["work"],
        queryFn: fetchWorks,
        initialData: defalutWorks,
    })
    const saveWorks = useSaveWorks()
    return {
        works,
        isLoading,
        ...saveWorks,
    } as const
}

export function useSaveWorks() {
    const { mutateAsync: save, isLoading: isSaving } = useMutation({
        mutationFn: (works: Work[]) => fetch("/api/work", {
            method: "PUT",
            body: JSON.stringify(works),
        }),
    })
    return {
        save, isSaving,
    } as const
}
