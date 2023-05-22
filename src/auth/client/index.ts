import { SignInOptions, SignOutParams, signIn as signInNextAuth, signOut as signOutNextAuth, useSession } from "next-auth/react"

export const signInAdmin = async (username: string, password: string, options: SignInOptions = {}) => {
    await signInNextAuth("credentials", {
        username, password,
        redirect: true,
        ...options
    })
}

export const signOutAdmin = async (options: SignOutParams = {}) => {
    await signOutNextAuth({ redirect: true, callbackUrl: "/admin/login", ...options })
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
