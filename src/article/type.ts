import { z } from "zod"

export const ArticleSchema = z.object({
    title: z.string(),
    publishAt: z.number(),
    media: z.enum([
        "zenn", "qiita", "scrap",
    ]),
    link: z.string(),
    ogImage: z.string(),
})
export type Article = z.infer<typeof ArticleSchema>
