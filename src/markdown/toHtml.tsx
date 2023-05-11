import zennMarkdownHtml from 'zenn-markdown-html';

export const markdownToHtml = (md: string) => {
    const html = zennMarkdownHtml(md)
    return html
}
