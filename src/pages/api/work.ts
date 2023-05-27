import { apiRouteOf } from "@/server/apiRoute"
import { getWorks, saveWorks } from "@/work/server"
import { WorkSchema } from "@/work/type"

export default apiRouteOf({
    cors: {
        origin: "*",
        method: ["GET"],
    },
    async onGet({ req, res }) {
        res.json(await getWorks())
    },
    requireAuthPut: true,
    async onPut({ req, res }) {
        const works = WorkSchema.array().parse(
            JSON.parse(req.body)
        )
        await saveWorks(works)
        res.json({ msg: "ok" })
    }
})
