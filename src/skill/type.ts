import { z } from "zod"

export const SkillSchema = z.object({
    icon: z.string(),
    name: z.string(),
    assessment: z.number(),
    assessmentMax: z.number(),
    interest: z.boolean(),
    tags: z.string().array(),
})
export type Skill = z.infer<typeof SkillSchema>
