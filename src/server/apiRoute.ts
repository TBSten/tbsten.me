import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { createRouter } from "next-connect";

type Router = ReturnType<typeof createRouter<NextApiRequest, NextApiResponse>>

type MethodHandler<Arg extends {} = {}> = ({ req, res }: {
    req: NextApiRequest
    res: NextApiResponse
    invalidRequest: (res: NextApiResponse, msg?: string) => void
    invalidBody: (res: NextApiResponse, msg?: string) => void
} & Arg) => ReturnType<NextApiHandler>
type ErrorHandler = ({ }: {
    req: NextApiRequest
    res: NextApiResponse
    error: unknown
}) => ReturnType<NextApiHandler>

export const apiRouteOf = (options: {
    cors?: {
        origin?: string,
        method?: string[],
        headers?: string[],
    },
    onGet?: MethodHandler
    requireAuthGet?: boolean
    onPost?: MethodHandler<{ body: unknown }>
    requireAuthPost?: boolean
    onPut?: MethodHandler<{ body: unknown }>
    requireAuthPut?: boolean
    onDelete?: MethodHandler<{ body: unknown }>
    requireAuthDelete?: boolean
    onError?: ErrorHandler
    router?: (router: Router) => Router
}) => {
    const cors = options.cors && {
        origin: "*",
        method: ["GET"],
        headers: ["Content-Type"],
        ...options.cors,
    }
    const {
        onGet, onPost, onPut, onDelete,
        requireAuthGet: requireAuthGet, requireAuthPost, requireAuthPut, requireAuthDelete,
        router: customRouter,
    } = options

    let router = createRouter<NextApiRequest, NextApiResponse>()

    if (cors) {
        router = router
            .use(async (req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', cors.origin)
                res.setHeader('Access-Control-Allow-Methods', cors.method.join(","))
                res.setHeader('Access-Control-Allow-Headers', cors.headers.join(","))
                next()
            })
    }

    // methods

    const invalidRequest: Parameters<MethodHandler>[0]["invalidRequest"] = (res, msg) =>
        res.status(400).json(msg ?? "invalid request")
    const invalidBody: Parameters<MethodHandler>[0]["invalidBody"] = (res, msg) =>
        res.status(400).json(msg ?? "invalid body")

    const auth: Parameters<typeof router.use>[0] = async (req, res, next) => {
        const session = await getServerSession(req, res, authOptions)
        if (session) {
            next()
        } else {
            res.status(401).json({
                msg: "please login ."
            })
        }
    }

    if (onGet) {
        if (requireAuthGet) router.use(auth)
        router = router.get(async (req, res) =>
            onGet({
                req, res,
                invalidRequest, invalidBody,
            })
        )
    }
    if (onPost) {
        if (requireAuthPost) router.use(auth)
        router = router.post(async (req, res) =>
            onPost({
                req, res, body: req.body,
                invalidRequest, invalidBody,
            })
        )
    }
    if (onPut) {
        if (requireAuthPut) router.use(auth)
        router = router.put(async (req, res) =>
            onPut({
                req, res, body: req.body,
                invalidRequest, invalidBody,
            })
        )
    }
    if (onDelete) {
        if (requireAuthDelete) router.use(auth)
        router = router.delete(async (req, res) =>
            onDelete({
                req, res, body: req.body,
                invalidRequest, invalidBody,
            })
        )
    }

    // router
    if (customRouter) {
        router = customRouter(router)
    }

    const onError = options.onError ?? (
        ({ req, res, error }) => {
            console.error("unknown error", error)
            console.error({ req, res })
            return res.status(500).json({
                msg: "unknown error",
                error: error instanceof Error ? error.message : error,
            })
        }
    )
    return router.handler({
        onError: async (error, req, res) => {
            onError({
                req, res, error
            })
        },
    })
}
