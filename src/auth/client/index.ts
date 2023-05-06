import { signIn as signInNextAuth, signOut as signOutNextAuth, useSession } from "next-auth/react"

export const signInAdmin = async (username: string, password: string) => {
    await signInNextAuth("credentials", {
        username, password,
        redirect: true,
    })
}

export const signOutAdmin = async () => {
    await signOutNextAuth({ redirect: true })
}

export const useAdmin = () => {
    const { status } = useSession()
    const isLoading = status === "loading"
    return {
        isLoading,
        status: status === "loading"
            ? "loading"
            : status === "authenticated" ? "admin" : "unknown",
    } as const
}
