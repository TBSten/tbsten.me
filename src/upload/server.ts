import { storage } from "@/gcp/storage";
import { randomId } from "@/util/random";

export const getUploadUrls = async (filename: string = randomId()) => {
    const file = storage
        .bucket("tbsten-me-public-content")
        .file(filename)
    const [uploadUrl] = await file.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 10 * 60 * 1000,
    })
    return {
        uploadUrl,
        publicUrl: file.publicUrl(),
    } as const
}
