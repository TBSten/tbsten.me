import { collectionOf } from "@/gcp/firestore"
import { PageAccess, PageAccessSchema } from "../type"

const pageAccessCollection = collectionOf("pageAccess", PageAccessSchema)
export const logPageAccess = async (input: PageAccess) => {
    console.log("access-log", input)
    await pageAccessCollection.add(input)
}
