import { useQuery } from "@tanstack/react-query";
import { WorkSchema } from "../type";

export function useWorks() {
    const { data: works, isLoading, } = useQuery({
        queryKey: ["work"],
        queryFn: () => fetch(`/api/work`)
            .then(r => r.json())
            .then(r => WorkSchema.array().parse(r))
    })
    return {
        works,
        isLoading,
    } as const
}
