import { useMutation } from "@tanstack/react-query"

export const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
}

export function useCopy() {
    const { mutateAsync, isLoading, isSuccess, isError, } = useMutation({
        mutationFn: async (text: string) => {
            await copy(text)
        },
    })
    return {
        isCoping: isLoading,
        isSuccess, isError,
        copy: mutateAsync,
    } as const
}
