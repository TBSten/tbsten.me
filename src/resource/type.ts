import { z } from "zod"

export const ResourceSchema = z.object({
    name: z.string(),
    publicUrl: z.string(),
    mime: z.string().nullable(),
})
export type Resource = z.infer<typeof ResourceSchema>
