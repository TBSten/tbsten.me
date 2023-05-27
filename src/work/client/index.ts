import { useMutation, useQuery } from "@tanstack/react-query";
import { Work, WorkSchema } from "../type";

export function useWorks({ default: defalutWorks }: { default?: Work[] } = {}) {
    const { data: works, isLoading, } = useQuery({
        queryKey: ["work"],
        queryFn: () => fetch(`/api/work`)
            .then(r => r.json())
            .then(r => WorkSchema.array().parse(r)),
        initialData: defalutWorks,
    })
    const { mutateAsync: save, isLoading: isSaving } = useMutation({
        mutationFn: (works: Work[]) => fetch("/api/work", {
            method: "PUT",
            body: JSON.stringify(works),
        }),
    })
    return {
        works,
        isLoading,
        save, isSaving,
    } as const
}
