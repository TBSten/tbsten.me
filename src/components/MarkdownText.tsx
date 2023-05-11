import { useMarkdownToHtml } from "@/markdown/client";
import classNames from "classnames";
import { FC } from "react";
import Loading from "./Loading";

interface MarkdownTextProps {
    markdown: string
    compact?: boolean
}
const MarkdownText: FC<MarkdownTextProps> = ({ markdown, compact }) => {
    const { html, isLoading } = useMarkdownToHtml(markdown)
    if (isLoading || !html) return <Loading />
    return (
        <div className={classNames("znc w-full overflow-auto", { "compact": compact })} dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default MarkdownText;