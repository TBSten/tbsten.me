import { Firestore, FirestoreDataConverter } from "@google-cloud/firestore"
import { ZodSchema } from "zod"

export const db = new Firestore()

export const collectionOf = <T extends object>(name: string, schema: ZodSchema<T>) => {
    const conv: FirestoreDataConverter<T> = {
        fromFirestore(snap) {
            return schema.parse(snap.data())
        },
        toFirestore(data) {
            return { ...data }
        }
    }
    const collection = db.collection(name)
        .withConverter(conv)
    return collection
}
