import { z } from "zod"

export const SettingsSchema = z.object({
    adminKey: z.string(),
})
export type Settings = z.infer<typeof SettingsSchema>
