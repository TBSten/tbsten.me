import { z } from "zod"

export const PageAccessSchema = z.object({
    path: z.string(),
    ip: z.string().nullable(),
    accessAt: z.string(),
})
export type PageAccess = z.infer<typeof PageAccessSchema>
