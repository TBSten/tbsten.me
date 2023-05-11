import { useEffect, useState } from "react";

export function useHash() {
    const [hash, setHash] = useState<null | string>(null)
    useEffect(() => {
        const hashHandler = () => {
            setHash(location.hash.replace(/^#/, ""))
        }
        hashHandler()
        window.addEventListener("hashchange", hashHandler)
        return () => {
            window.removeEventListener("hashchange", hashHandler)
        }
    }, [])
    return hash
}
