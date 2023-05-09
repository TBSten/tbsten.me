import { collectionOf } from "@/gcp/firestore";
import { randomId } from "@/util/random";
import { Monolog, MonologSchema, NewMonolog, UpdateMonolog } from "../type";

const monologCollection = collectionOf("monolog", MonologSchema)

export const addMonolog = async (input: NewMonolog) => {
    const slug = input.slug && input.slug.length >= 1 ? input.slug : randomId()
    const now = Date.now()
    const newMonolog: Monolog = {
        ...input,
        slug,
        createAt: now,
        updateAt: now,
        publishAt: null,
        isPublished: false,
    }
    await monologCollection.doc(slug).create(newMonolog)
    return await getMonolog(slug)
}

export const getMonolog = async (slug: string) => {
    const snap = await monologCollection.doc(slug).get()
    return snap.data()
}

export const updateMonolog = async (slug: string, input: UpdateMonolog) => {
    const updateMonolog: Partial<Monolog> = {}
    const old = await monologCollection.doc(slug).get().then(d => d.data())
    if (!old) throw new Error(`invalid slug :${slug}. not exists .`)
    // 各種更新のロジック
    if (input.type === "publish") {
        updateMonolog.isPublished = true
        updateMonolog.publishAt = Date.now()
    } else if (input.type === "unpublish") {
        updateMonolog.isPublished = false
        updateMonolog.publishAt = null
    } else if (input.type === "update") {
        updateMonolog.content = input.content
    } else throw new Error(`invalid update monolog type : ${JSON.stringify(input)}`)
    await monologCollection.doc(slug).update(updateMonolog)

    return await getMonolog(slug)
}

export const deleteMonolog = async (slug: string) => {
    await monologCollection.doc(slug).delete()
}

export const getMonologList = async ({ dir = "desc", sortBy = "publishAt", filter, }: {
    dir?: "desc" | "asc"
    sortBy?: "publishAt" | "createAt"
    filter?: string
} = {}) => {
    let ref = monologCollection.orderBy(sortBy, dir)
    if (filter) {
        switch (filter) {
            case "onlyPublished":
                ref = ref.where("isPublished", "==", true)
                break
            default:
                throw new Error(`invalid filter ${filter}`)
        }
    }
    const snap = await ref.get()
    return snap.docs.map(d => d.data())
}
