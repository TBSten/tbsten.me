import { z } from "zod"

export const MonologSchema = z.object({
    slug: z.custom<string>(val => typeof val === "string" && !/\s/g.test(val), {
        message: "slugに空白を含めることはできません。",
    }),
    draft: z.string(),
    isPublished: z.boolean(),
    publishedContent: z.string().nullable(),
    createAt: z.number(),
    updateAt: z.number(),
    publishAt: z.number().nullable(),
})
export type Monolog = z.infer<typeof MonologSchema>

export const NewMonologSchema = MonologSchema.pick({
    draft: true,
}).extend({
    slug: MonologSchema.shape.slug.optional(),
})
export type NewMonolog = z.infer<typeof NewMonologSchema>

export const UpdateMonologSchema = z.union([
    z.object({
        type: z.literal("publish"),
        publishAt: z.number().optional(),
    }),
    z.object({
        type: z.literal("unpublish"),
    }),
    z.object({
        type: z.literal("updateDraft"),
        draft: z.string(),
    }),
])
export type UpdateMonolog = z.infer<typeof UpdateMonologSchema>
