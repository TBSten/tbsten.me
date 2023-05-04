import { readAsString, storage } from "@/gcp/storage";
import { Work, WorkSchema } from "../type";

export const getWorks = async (): Promise<Work[]> => {
    const file = storage
        .bucket(process.env.GCP_DATA_STORAGE as string)
        .file("works.json")
    const skills = await readAsString(file).then(text => JSON.parse(text))
    return WorkSchema.array().parse(skills)
}
