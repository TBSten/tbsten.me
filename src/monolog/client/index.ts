import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { Monolog, MonologSchema, NewMonolog, UpdateMonolog } from "../type";

export function useMonologList(options: {
    sortBy: "publishAt" | "createAt"
    filter?: ("onlyPublished") | null
    default?: Monolog[]
}) {
    const { data: monologList, refetch, isLoading } = useQuery({
        queryKey: ["monolog"],
        queryFn: () => {
            const params = new URLSearchParams({
                sortBy: options.sortBy,
            })
            if (options.filter) params.append("filter", options.filter)
            return fetch(`/api/monolog?${params.toString()}`)
                .then(r => r.json())
                .then(r => MonologSchema.array().parse(r))
        },
        initialData: options.default,
    })
    return {
        monologList,
        refetch,
        isLoading,
    } as const
}

export function useMonologMutation(options: {
    add?: UseMutationOptions<void, unknown, NewMonolog, unknown>,
    change?: UseMutationOptions<void, unknown, { slug: string, input: UpdateMonolog, }, unknown>,
    delete?: UseMutationOptions<void, unknown, { slug: string }, unknown>,
} = {}) {
    // add
    const { mutateAsync: addMonolog, isLoading: isAddingMonolog } = useMutation({
        mutationFn: async (input: NewMonolog) => {
            const res = await fetch("/api/monolog", {
                method: "POST",
                body: JSON.stringify(input),
            })
            if (!res.ok) throw new Error(res.statusText, { cause: res })
        },
        ...options.add,
    })
    // change
    const { mutateAsync: changeMonolog, variables: changeVars, isLoading: isChanging, } = useMutation({
        mutationFn: async ({ slug, input }: { slug: string, input: UpdateMonolog }) => {
            const res = await fetch(`/api/monolog/${slug}`, {
                method: "PUT",
                body: JSON.stringify(input),
            })
        },
        ...options.change,
    })
    // delete
    const { mutateAsync: deleteMonolog, variables: deleteVars, isLoading: isDeleting } = useMutation({
        mutationFn: async ({ slug }: { slug: string }) => {
            const res = await fetch(`/api/monolog/${slug}`, {
                method: "DELETE",
            })
        },
        ...options.delete,
    })
    return {
        currentChangingSlug: isChanging ? changeVars?.slug : null,
        currentDeletingSlug: isDeleting ? deleteVars?.slug : null,
        addMonolog, isAddingMonolog,
        changeMonolog, isChanging,
        deleteMonolog, isDeleting,
    } as const
}

export function useRandomMonolog() {
    const { data: monolog, isLoading } = useQuery({
        queryKey: ["monolog", "random"],
        queryFn: () => fetch("/api/monolog/random")
            .then(r => r.json())
            .then(r => MonologSchema.parse(r)),
        staleTime: 30 * 1000,
    })
    return { monolog, isLoading } as const
}

