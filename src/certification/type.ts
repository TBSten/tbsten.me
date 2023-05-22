import { z } from "zod"

export const CertificationSchema = z.object({
    name: z.string(),
    tag: z.string().array(),
    getAt: z.number(),
})
export type Certification = z.infer<typeof CertificationSchema>
