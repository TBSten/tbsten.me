import { apiRouteOf } from "@/server/apiRoute";
import zennMarkdownHtml from 'zenn-markdown-html';

export default apiRouteOf({
    async onPost({ req, res, invalidBody }) {
        const md = req.body
        const html = zennMarkdownHtml(md)
        return res.send(html)
    },
})
