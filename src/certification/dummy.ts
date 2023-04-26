import dayjs from "dayjs";
import { Certification } from "./type";

export const dummyCertifications: Certification[] = [
    {
        name: "基本情報技術者試験",
        tag: ["IPA"],
        getAt: dayjs("2019-05-12T12:00:00.000Z").valueOf(),
    },
    {
        name: "応用情報技術者試験",
        tag: ["IPA"],
        getAt: dayjs("2019-12-25T12:00:00.000Z").valueOf(),
    },
    {
        name: "情報処理安全確保支援士",
        tag: ["IPA"],
        getAt: dayjs("2021-12-25T12:00:00.000Z").valueOf(),
    },
    {
        name: "ネットワークスペシャリスト",
        tag: ["IPA"],
        getAt: dayjs("2022-05-12T12:00:00.000Z").valueOf(),
    },
]
