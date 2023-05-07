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
                return
            })
    }

    // methods

    const invalidRequest: Parameters<MethodHandler>[0]["invalidRequest"] = (res, msg) =>
        res.status(400).json(msg ?? "invalid request")
    const invalidBody: Parameters<MethodHandler>[0]["invalidBody"] = (res, msg) =>
        res.status(400).json(msg ?? `invalid body`)

    const auth: Parameters<typeof router.use>[0] = async (req, res, next) => {
        const session = await getServerSession(req, res, authOptions)
        if (session) {
            return await next()
        } else {
            res.status(401).json({
                msg: "please login ."
            })
            throw new Error("please login")
        }
    }
    const getBody = (req: NextApiRequest): unknown => {
        let body = null
        try {
            body = JSON.parse(req.body)
        } catch (e) { }
        return body
    }

    if (onGet) {
        if (requireAuthGet) router.use(auth)
        router = router.get(async (req, res) =>
            await onGet({
                req, res,
                invalidRequest, invalidBody,
            })
        )
    }
    if (onPost) {
        if (requireAuthPost) router.use(auth)
        router = router.post(async (req, res) =>
            await onPost({
                req, res, body: getBody(req),
                invalidRequest, invalidBody,
            })
        )
    }
    if (onPut) {
        if (requireAuthPut) router.use(auth)
        router = router.put(async (req, res) =>
            await onPut({
                req, res, body: getBody(req),
                invalidRequest, invalidBody,
            })
        )
    }
    if (onDelete) {
        if (requireAuthDelete) router.use(auth)
        router = router.delete(async (req, res) =>
            await onDelete({
                req, res, body: getBody(req),
                invalidRequest, invalidBody,
            })
        )
    }

    // router
    if (customRouter) {
        router = customRouter(router)
    }

    return router.handler({
        onError: async (error, req, res) => {
            console.error("unknown error occurred", error)
            res.status(500).end("Internal server error")
        },
    })
}
