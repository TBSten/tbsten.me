import { Zen_Kaku_Gothic_New } from "next/font/google"
import localFont from "next/font/local"

export const kiwiMaru = Zen_Kaku_Gothic_New({
    weight: ["400", "700"],
    subsets: ["latin"],
})

export const dotFont = localFont({
    src: [
        {
            path: "./PixelMplus12-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./PixelMplus12-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
})

export const mainFont = kiwiMaru
