import { collectionOf } from "@/gcp/firestore";
import { randomId } from "@/util/random";
import { Monolog, MonologSchema, NewMonolog } from "../type";

const monologCollection = collectionOf("monolog", MonologSchema)

export const addMonolog = async (input: NewMonolog) => {
    const {
        slug = randomId(),
    } = input
    const now = Date.now()
    const newMonolog: Monolog = {
        slug,
        ...input,
        createAt: now,
        updateAt: now,
        publishAt: null,
        isPublished: false,
        publishedContent: null,
    }
    await monologCollection.doc(slug).create(newMonolog)
    return await getMonolog(slug)
}
export const getMonolog = async (slug: string) => {
    const snap = await monologCollection.doc(slug).get()
    return snap.data()
}
export const updateMonolog = async (slug: string, input: Partial<NewMonolog>) => {
    await monologCollection.doc(slug).update(input)
}
export const deleteMonolog = async (slug: string) => {
    await monologCollection.doc(slug).delete()
}
