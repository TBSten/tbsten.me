import { z } from "zod"

export const MonologSchema = z.object({
    slug: z.string(),
    title: z.string(),
    draft: z.string(),
    isPublished: z.boolean(),
    publishedContent: z.string().nullable(),
    createAt: z.number(),
    updateAt: z.number(),
})
export type Monolog = z.infer<typeof MonologSchema>
