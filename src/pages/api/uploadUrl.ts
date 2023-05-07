import { apiRouteOf } from "@/server/apiRoute";
import { getUploadUrls } from "@/upload/server";

export default apiRouteOf({
    requireAuthGet: true,
    async onGet({ req, res }) {
        const fileName = (req.query.fileName ?? undefined) as string | undefined
        return res.json(
            await getUploadUrls(fileName)
        )
    },
})
