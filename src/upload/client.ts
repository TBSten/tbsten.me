import { useState } from "react"
import { z } from "zod"

export function useUpload({ }: SelectFileOption = {}) {
    const [isUploading, setIsUploading] = useState(false)
    const upload = async () => {
        const files = await selectFile({ multiple: true })
        if (!files) return null
        setIsUploading(true)
        const publicUrls = await Promise.all(Array.from(files).map(async file => {
            return await uploadFile(file)
        }))
        setIsUploading(false)
        return publicUrls
    }
    return {
        upload,
        isUploading,
    } as const
}

type SelectFileOption = Partial<{
    multiple: boolean
    accept: string
}>
export const selectFile = (options: SelectFileOption = {}) => new Promise<FileList | null>((resolve, reject) => {
    const el = document.createElement("input")
    el.type = "file"
    el.multiple = options.multiple ?? false
    el.accept = options.accept ?? "*/*"
    el.addEventListener("change", () => {
        resolve(el.files)
    })
    el.click()
})

export const uploadFile = async (file: File, name: string = file.name) => {
    const urls = await fetch(`/api/uploadUrl?fileName=${name}`)
        .then(r => r.json())
    const { publicUrl, uploadUrl, } = z.object({
        publicUrl: z.string(),
        uploadUrl: z.string(),
    }).parse(urls)
    await fetch(uploadUrl, {
        method: "PUT",
        body: file,
    })
    return publicUrl
}
