import { readAsString, storage } from "@/gcp/storage";
import { Skill, SkillSchema } from "../type";

export const getSkills = async (): Promise<Skill[]> => {
    const file = storage
        .bucket(process.env.GCP_DATA_STORAGE as string)
        .file("skills.json")
    const skills = await readAsString(file).then(text => JSON.parse(text))
    return SkillSchema.array().parse(skills)
}
