import { markdownToHtml } from "@/markdown/toHtml";
import { apiRouteOf } from "@/server/apiRoute";

export default apiRouteOf({
    requireAuthPost: true,
    async onPost({ req, res, invalidBody }) {
        const md = req.body
        const html = markdownToHtml(md)
        return res.send(html)
    },
})
