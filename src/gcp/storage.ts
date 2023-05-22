import { File, Storage } from "@google-cloud/storage"

export const storage = new Storage()

export const readAsString = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const stream = file.createReadStream()
        let data = ""
        stream.on("data", (chunk) => {
            data += chunk
        })
        stream.on('end', () => {
            resolve(data);
        })
        stream.on('error', reject)
    })
}
