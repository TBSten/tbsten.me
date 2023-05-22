import { addMonolog, getMonologList } from "@/monolog/server";
import { NewMonologSchema } from "@/monolog/type";
import { apiRouteOf } from "@/server/apiRoute";
import { z } from "zod";

export default apiRouteOf({
    cors: {
        origin: "*",
        method: ["GET"],
    },
    async onGet({ req, res, invalidRequest }) {
        const params = new URLSearchParams(req.query as Record<string, string>)
        const input = z.object({
            sortBy: z.union([z.literal("publishAt"), z.literal("createAt")])
                .default("publishAt"),
            dir: z.union([z.literal("asc"), z.literal("desc")])
                .default("desc"),
            filter: z.string().optional(),
        }).safeParse(Object.fromEntries(params.entries()))
        if (!input.success) {
            console.error(input.error)
            return invalidRequest(res)
        }
        const { dir, sortBy, filter } = input.data
        const monologList = await getMonologList({
            dir,
            sortBy,
            filter,
        })
        return res.json(monologList)
    },
    requireAuthPost: true,
    async onPost({ res, body, invalidBody }) {
        const input = NewMonologSchema.safeParse(body)
        if (!input.success) {
            return invalidBody(res, JSON.stringify(body))
        }
        const newMonolog = await addMonolog(input.data)
        res.json(newMonolog)
    },
})
