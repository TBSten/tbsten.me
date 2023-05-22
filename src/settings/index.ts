import { collectionOf } from "@/gcp/firestore";
import { Settings, SettingsSchema } from "./type";

const settingDocRef = collectionOf("settings", SettingsSchema).doc("v1")

export const getSettings = async () => {
    const snap = await settingDocRef.get()
    return SettingsSchema.parse(snap.data())
}
export const setSettings = async (newSettings: Partial<Settings>) => {
    await settingDocRef.set(newSettings, { merge: true })
}
