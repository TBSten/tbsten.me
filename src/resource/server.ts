import { storage } from "@/gcp/storage";
import { Resource } from "./type";

const getBucket = () => storage
    .bucket("tbsten-me-public-content")

export const getResources = async (): Promise<Resource[]> => {
    const [files] = await getBucket().getFiles({})
    return files.map(file => ({
        name: file.name,
        publicUrl: file.publicUrl(),
        mime: file.metadata?.contentType ?? null,
    }))
}

export const deleteResource = async (path: string) => {
    await getBucket().file(path).delete()
}
