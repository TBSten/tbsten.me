import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

export const ssrOf = <P extends { [key: string]: any; } = {},>(options: {
    requireAuth?: boolean
    hanlder: GetServerSideProps<P>
}): GetServerSideProps<P> => {
    return async (ctx) => {
        if (options.requireAuth) {
            const session = await getServerSession(ctx.req, ctx.res, authOptions)
            if (!session) {
                return {
                    notFound: true,
                }
            }
        }
        return await options.hanlder(ctx)
    }
}

export const ssrOfRequireAuth = () => ssrOf<{}>({
    requireAuth: true,
    hanlder: async () => ({ props: {} })
})
