import { useMarkdownToHtml } from "@/markdown/client";
import { FC } from "react";
import Loading from "./Loading";

interface MarkdownTextProps {
    markdown: string
}
const MarkdownText: FC<MarkdownTextProps> = ({ markdown }) => {
    const { html, isLoading } = useMarkdownToHtml(markdown)
    if (isLoading || !html) return <Loading />
    return (
        <div className="znc w-full overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default MarkdownText;