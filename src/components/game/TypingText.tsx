import { useDelayedValue } from "@/client/delayed";
import { FC, useEffect, useState, useTransition } from "react";

interface TypingTextProps {
    delay?: number
    interval?: number
    children: string
}
const TypingText: FC<TypingTextProps> = ({ children, delay = 0, interval = 200, }) => {
    const [_currentText, setCurrentText] = useState(children[0])
    const currentText = useDelayedValue(delay, _currentText)
    const [_, startTransition] = useTransition()
    useEffect(() => {
        const increment = setInterval(() => {
            startTransition(() => {
                setCurrentText(p => {
                    const pLen = p.length
                    const newTextLen = pLen + 1
                    if (newTextLen > children.length) {
                        clearInterval(increment)
                        return p
                    }
                    const newText = children.substring(0, newTextLen)
                    return newText
                })
            })
        }, interval)
        return () => {
            clearInterval(increment)
        }
    }, [children, interval])
    return (
        <>
            {currentText}
            {currentText !== children &&
                "|"
            }
        </>
    );
}

export default TypingText;