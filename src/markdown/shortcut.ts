
export const code = (code: string) => "`" + code + "`"
export const codeBlock = (lang: string, code: string) =>
    "```" + lang + "\n" +
    code.trimStart() +
    "```" + "\n"
export const md = {
    code,
    codeBlock,
    c: code,
    cb: codeBlock,
} as const
