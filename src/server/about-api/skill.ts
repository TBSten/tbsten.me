import { md } from "@/markdown/shortcut";
import dedent from "dedent-js";

export const skill = dedent`
# GET [${md.c("/api/skill")}](/api/skill)

[スキル](https://tbsten.me/skills)の一覧を取得するAPIです。
なお 現在絞り込みや並び替えには対応しておらず一覧のみ。あしからず...

### リクエスト形式

なし

### レスポンス形式

- スキルオブジェクトの配列
- スキルオブジェクトとは以下のような形式のオブジェクトです。

${md.codeBlock("json", `
{
    "icon": スキルの画像,
    "name": スキルの名称,
    "assessment": スキルに対する評価,
    "assessmentMax": スキルに対する評価の最大値,
    "interest": 現在TBStenがそのスキルに興味があるか,
    "tags": スキルのタグ(android,webなど),
    "learnStartYear": スキルを学習し始めた年
}
`)}
[Zodのスキーマはこちら](https://github.com/TBSten/tbsten.me/blob/18ff229b56e28b96ddad96a286d0b771964faf8a/src/skill/type.ts#L3-L11)

- 評価(assessment,assessmentMax)はTBStenの自己評価です。

:::details リクエスト例

${md.codeBlock("shell:curlでのリクエスト例", `
$ curl https://tbsten.me/api/skill
`)}

${md.codeBlock("js:JavaScriptでのリクエスト例", `
const skills = await fetch("https://tbsten.me/api/skill")
    .then(r=>r.json())
`)}

:::

:::details レスポンス例

${md.codeBlock("json", `
[
    {
        "icon": "https://storage.googleapis.com/tbsten-me-public-content/android.png",
        "name": "Android",
        "assessment": 2,
        "assessmentMax": 4,
        "interest": true,
        "tags": ["android"],
        "learnStartYear": 2022
    },
    {
        "icon": "https://storage.googleapis.com/tbsten-me-public-content/jetpackcompose.png",
        "name": "Jetpack Compose",
        "assessment": 3,
        "assessmentMax": 4,
        "interest": true,
        "tags": ["android","mobile"],
        "learnStartYear": 2022
    },
    {
        "icon": "https://storage.googleapis.com/tbsten-me-public-content/kotlin.png",
        "name": "Kotlin",
        "assessment": 3,
        "assessmentMax": 4,
        "interest": true,
        "tags": ["android","language","jvm"],
        "learnStartYear": 2022
    },
]
`)}

:::

`
