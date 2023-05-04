import { FC, useEffect, useState } from "react";

interface TypingTextProps {
    interval?: number
    children: string
}
const TypingText: FC<TypingTextProps> = ({ children, interval = 200, }) => {
    const [currentText, setCurrentText] = useState(children[0])
    useEffect(() => {
        const increment = setInterval(() => {
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