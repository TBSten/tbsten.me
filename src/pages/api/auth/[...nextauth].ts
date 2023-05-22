import { loginAdmin } from "@/auth/server"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const ok = await loginAdmin(credentials?.username ?? "", credentials?.password ?? "")
                if (!ok) return null
                return {
                    id: "admin-user",
                }
            },
        }),
    ],
}
export default NextAuth(authOptions)
