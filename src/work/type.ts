import { z } from "zod"

export const WorkSchema = z.object({
    title: z.string(),
    detail: z.string(),
    link: z.string(),
    image: z.string(),
})
export type Work = z.infer<typeof WorkSchema>
