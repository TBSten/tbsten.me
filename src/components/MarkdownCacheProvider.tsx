import { FC, ReactNode, createContext, useContext } from "react";

const markdownContext = createContext<Record<string, string>>({})

interface MarkdownCacheProviderProps {
    markdowns: Record<string, string>
    children?: ReactNode
}
const MarkdownCacheProvider: FC<MarkdownCacheProviderProps> = ({ markdowns, children }) => {
    return (
        <markdownContext.Provider value={markdowns}>
            {children}
        </markdownContext.Provider>
    );
}

export default MarkdownCacheProvider;

export function useMarkdownCache() {
    const markdowns = useContext(markdownContext)
    return markdowns
}
