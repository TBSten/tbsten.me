import { deleteResource, getResources } from "@/resource/server";
import { apiRouteOf } from "@/server/apiRoute";
import { z } from "zod";

export default apiRouteOf({
    requireAuthGet: true,
    async onGet({ req, res }) {
        const links = await getResources()
        return res.json(links)
    },
    requireAuthDelete: true,
    async onDelete({ req, res, invalidRequest }) {
        const path = z.string().safeParse(req.query.path)
        if (!path.success) return invalidRequest(res, "invalid `path` query .")
        await deleteResource(path.data)
        res.json({ msg: "ok" })
    },
})
