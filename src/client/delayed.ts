import { useEffect, useState } from "react"
export function useDelayedValue<S,>(delay: number, value: S): S {
    const [delayed, setDelayed] = useState(value)
    useEffect(() => {
        const d = setTimeout(() => {
            setDelayed(value)
        }, delay)
        return () => {
            clearTimeout(d)
        }
    }, [delay, value])
    return delayed
}
