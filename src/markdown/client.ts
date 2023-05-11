import { useMarkdownCache } from '@/components/MarkdownCacheProvider';
import { useQuery } from "@tanstack/react-query";

export function useMarkdownToHtml(markdown: string) {
    const markdownCache = useMarkdownCache()
    const needToFetch = !markdownCache[markdown]
    const { data: html, isLoading } = useQuery({
        enabled: needToFetch,
        initialData: needToFetch ? undefined : markdownCache[markdown],
        queryKey: ["mdToHtml", markdown],
        queryFn: () =>
            fetch("/api/mdToHtml", {
                method: "POST",
                body: markdown,
            })
                .then(r => r.text()),
        staleTime: 3600 * 1000,
    })
    return { html, isLoading }
}
