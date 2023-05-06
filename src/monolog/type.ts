import { z } from "zod"

export const MonologSchema = z.object({
    slug: z.string(),
    title: z.string(),
    draft: z.string(),
    isPublished: z.boolean(),
    publishedContent: z.string().nullable(),
    createAt: z.number(),
    updateAt: z.number(),
    publishAt: z.number().nullable(),
})
export type Monolog = z.infer<typeof MonologSchema>

export const NewMonologSchema = MonologSchema.pick({
    title: true,
    draft: true,
}).extend({
    slug: MonologSchema.shape.slug.optional(),
})
export type NewMonolog = z.infer<typeof NewMonologSchema>
