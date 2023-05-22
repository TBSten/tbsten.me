import { readAsString, storage } from "@/gcp/storage";
import { Skill, SkillSchema } from "../type";

const getSkillsFile = () => storage
    .bucket(process.env.GCP_DATA_STORAGE as string)
    .file("skills.json")

export const getSkills = async (): Promise<Skill[]> => {
    const file = getSkillsFile()
    const skills = await readAsString(file).then(text => JSON.parse(text))
    return SkillSchema.array().parse(skills)
}

export const saveSkills = async (input: Skill[]) => {
    const file = getSkillsFile()
    return await file.save(JSON.stringify(input))
}
