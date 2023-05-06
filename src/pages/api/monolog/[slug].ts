import { deleteMonolog, getMonolog, updateMonolog } from "@/monolog/server";
import { UpdateMonologSchema } from "@/monolog/type";
import { apiRouteOf } from "@/server/apiRoute";


export default apiRouteOf({
    async onGet({ req, res }) {
        const slug = req.query.slug as string
        const monolog = await getMonolog(slug)
        if (!monolog) res.status(404)
        return res.json(monolog)
    },
    requireAuthPut: true,
    async onPut({ req, res, body, invalidBody }) {
        const slug = req.query.slug as string
        const input = UpdateMonologSchema.safeParse(body)
        if (!input.success) return invalidBody(res)
        const newMonolog = await updateMonolog(slug, input.data)
        return res.json(newMonolog)
    },
    requireAuthDelete: true,
    async onDelete({ req, res }) {
        const slug = req.query.slug as string
        await deleteMonolog(slug)
        return res.json({ msg: "ok" })
    }
})
