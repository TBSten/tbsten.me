import { md } from "@/markdown/shortcut"
import dedent from "dedent-js"

const route = "/api/work"

export const work = dedent`
# GET [${md.c(route)}](${route})

[作ったもの](/works)で公開しているものを取得するAPIです。

### リクエスト形式

なし

### レスポンス形式

- 作ったものオブジェクトの配列
- 作ったものオブジェクトとは以下のような形式のオブジェクトです。

${md.cb("json", `
{
    "title": タイトル,
    "detail": 作ったものの説明,
    "link": 作ったもののリンク,
    "image": イメージ画像
}
`)}

:::details リクエスト例
${md.codeBlock("shell:curlでのリクエスト例1", `
curl https://tbsten.me${route}
`)}
${md.codeBlock("js:JavaScriptでのリクエスト例", `
const monolog = await fetch("https://tbsten.me${route}")
    .then(r=>r.json())
`)}
:::

:::details レスポンス例
${md.cb("json", `
[
    {
        "title": "ポートフォリオサイト",
        "detail": "謎にレトロゲーム風なポートフォリオサイトです。",
        "link": "https://tbsten.me",
        "image": "https://storage.googleapis.com/tbsten-me-public-content/portfolio.png"
    },
    {
        "title": "Flowchart Build Executor",
        "detail": "フローチャートを組み立てて実行するツールです！",
        "link": "https://fbe.vercel.app",
        "image": "https://storage.googleapis.com/tbsten-me-public-content/fbe.png"
    },
    {
        "title": "guess RGB",
        "detail": "表示された色のRGB値を当てるWebアプリです。",
        "link": "https://guess-rgb.vercel.app/",
        "image": "https://storage.googleapis.com/tbsten-me-public-content/guessRGB.png"
    }
]
`)}
:::

`
