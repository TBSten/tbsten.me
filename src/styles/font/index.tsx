import { M_PLUS_1 } from "next/font/google"
import localFont from "next/font/local"

export const mPlus1 = M_PLUS_1({
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

export const mainFont = mPlus1
