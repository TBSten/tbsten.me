import { getRandomMonolog } from "@/monolog/server";
import { apiRouteOf } from "@/server/apiRoute";

export default apiRouteOf({
    cors: {
        origin: "*",
        method: ["GET"],
    },
    async onGet({ req, res }) {
        const monolog = await getRandomMonolog()
        return res.json(monolog)
    },
})
