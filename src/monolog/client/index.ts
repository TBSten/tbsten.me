import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { MonologSchema, NewMonolog, UpdateMonolog } from "../type";

export function useMonologList(options: { sortBy: "publishAt" | "createAt" }) {
    const { data: monologList, refetch, isLoading } = useQuery({
        queryKey: ["monolog"],
        queryFn: () => fetch(`/api/monolog?sortBy=${options.sortBy}`)
            .then(r => r.json())
            .then(r => MonologSchema.array().parse(r)),
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
    const { mutateAsync: addDraft, isLoading: isAddingDraft } = useMutation({
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
        addDraft, isAddingDraft,
        changeMonolog, isChanging,
        deleteMonolog, isDeleting,
    } as const
}