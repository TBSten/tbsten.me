import { markdownToHtml } from "./toHtml"

export const createMarkdownCache = (...markdowns: string[]) => {
    return markdowns.reduce((cache, md) => {
        cache[md] = markdownToHtml(md)
        return cache
    }, {} as Record<string, string>)
}
