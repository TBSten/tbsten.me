import { collectionOf } from "@/gcp/firestore";
import { SkillSchema } from "../type";

const skillCollection = collectionOf("skills", SkillSchema)

export const getSkills = async () => {
    const snap = await skillCollection.get()
    return snap.docs
        .sort((a, b) => b.createTime.toMillis() - a.createTime.toMillis())
        .map(d => d.data())
}

