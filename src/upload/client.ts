import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { z } from "zod"

export function useUpload({ }: SelectFileOption = {}) {
    const [isUploading, setIsUploading] = useState(false)
    const [url, setUrl] = useState<null | string>(null)
    const upload = useMutation({
        mutationFn: async () => {
            const files = await selectFile({ multiple: true })
            if (!files) return null
            setIsUploading(true)
            const publicUrls = await Promise.all(Array.from(files).map(async file => {
                const url = await uploadFile(file)
                setUrl(url)
                return url
            }))
            setIsUploading(false)
            return publicUrls
        },
    })
    return {
        upload: upload.mutateAsync,
        isUploading,
        url,
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
