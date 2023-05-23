import dedent from "dedent-js"

export const code = (code: string) => "`" + code + "`"
export const codeBlock = (lang: string, code: string) =>
    "```" + lang + "\n" +
    dedent(code) + "\n" +
    "```" + "\n"
export const md = {
    code,
    codeBlock,
    c: code,
    cb: codeBlock,
} as const
