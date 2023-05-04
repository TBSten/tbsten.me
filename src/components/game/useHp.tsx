import { useCallback, useEffect, useState } from "react"

const HP_STOREJS_KEY = "tbsten__hp"
export function useHp(props: {
    onKnock?: () => void,
} = {}) {
    const [maxHp, setMaxHp] = useState(200)
    const [hp, setHp] = useState(maxHp)

    const save = useCallback((newHp: number = hp) => {
        localStorage.setItem(HP_STOREJS_KEY, `${newHp}`)
    }, [hp])
    const setHpWithSave: typeof setHp = useCallback((action) => {
        setHp(p => {
            let newHp: number = typeof action === "function"
                ? action(p)
                : action
            newHp = Math.max(newHp, 0)
            save(newHp)
            return newHp
        })
    }, [save])

    useEffect(() => {
        const rawHp = localStorage.getItem(HP_STOREJS_KEY)
        if (!rawHp) return
        const loadedHp = parseInt(rawHp)
        if (loadedHp <= 0) setHp(maxHp)
        else setHp(loadedHp)
    }, [maxHp, setHp])

    const attack = useCallback((damage: number, {
        onKnock,
    }: {
        onKnock?: () => void,
    } = {}) => {
        return new Promise<number>((resolve) => {
            setHpWithSave(p => {
                const newHp = Math.max(p - damage, 0)
                resolve(newHp)
                if (p > 0 && newHp === 0) {
                    props.onKnock && props.onKnock()
                    onKnock && onKnock()
                }
                return newHp
            })
        })
    }, [props, setHpWithSave])

    return {
        hp, setHp: setHpWithSave,
        maxHp, setMaxHp,
        save,
        attack,
        knocked: hp <= 0,
    } as const
}