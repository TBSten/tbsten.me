import { addMonolog, getMonologList } from "@/monolog/server";
import { NewMonologSchema } from "@/monolog/type";
import { apiRouteOf } from "@/server/apiRoute";
import { z } from "zod";

export default apiRouteOf({
    async onGet({ req, res }) {
        const sortBy = z.union([z.literal("publishAt"), z.literal("createAt")])
            .default("publishAt")
            .parse(req.query.sortBy)
        const dir = z.union([z.literal("asc"), z.literal("desc")])
            .default("desc")
            .parse(req.query.dir)
        const monologList = await getMonologList({
            dir,
            sortBy,
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
