import { useMutation, useQuery } from "@tanstack/react-query";
import { Resource, ResourceSchema } from "./type";

export function useResource({ init }: Partial<{ init: Resource[] }> = {}) {
    const { data: resources, refetch: refresh } = useQuery({
        queryKey: ["resources"],
        queryFn: () =>
            fetch("/api/resource")
                .then(r => r.json())
                .then(r => ResourceSchema.array().parse(r)),
        initialData: init,
    })
    const { mutateAsync: deleteResource } = useMutation({
        mutationFn: async ({ name }: Resource) => {
            await fetch(`/api/resource?path=${name}`, {
                method: "DELETE",
            }).then(r => r.json())
            refresh()
        }
    })
    return {
        resources,
        refresh,
        deleteResource,
    } as const
}