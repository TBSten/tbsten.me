import { useQuery } from "@tanstack/react-query";

export function useMarkdownToHtml(markdown: string) {
    const { data: html, isLoading } = useQuery({
        queryKey: ["mdToHtml", markdown],
        queryFn: () =>
            fetch("/api/mdToHtml", {
                method: "POST",
                body: markdown,
            })
                .then(r => r.text()),
    })
    return { html, isLoading }
}
