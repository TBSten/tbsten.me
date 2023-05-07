import crypto from "crypto"

export const loginAdmin = async (username: string, password: string): Promise<boolean> => {
    return (
        username === process.env.ADMIN_USERNAME &&
        textToHash(password) === process.env.ADMIN_PASSWORD_HASH
    )
}

const textToHash = (text: string) => {
    let hashed = text
    for (let _ in Array.from({ length: 1000 })) {
        hashed = crypto.createHash('md5').update(hashed).digest('hex')
    }
    return hashed
}
