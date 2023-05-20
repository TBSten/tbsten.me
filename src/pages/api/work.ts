import { apiRouteOf } from "@/server/apiRoute"
import { getWorks } from "@/work/server"

export default apiRouteOf({
    cors: {
        origin: "*",
        method: ["GET"],
    },
    async onGet({ req, res }) {
        res.json(await getWorks())
    },
})
