import { md } from "@/markdown/shortcut"
import dedent from "dedent-js"

const route = "/api/work"

export const work = dedent`
# GET [${md.c(route)}]()

:::message
作成中
:::


TODO:概要を記載

### リクエスト形式

TODO:リクエスト形式を記載

### レスポンス形式

TODO:レスポンス形式を記載

:::details リクエスト例
${md.cb("shell:curlでのリクエスト例", `
TODO:curlでのリクエスト例を記載
`)}
${md.cb("js:JavaScriptでのリクエスト例", `
TODO:JSでのリクエスト例を記載
`)}
:::

:::details レスポンス例
${md.cb("json", `
// TODO:レスポンス例
`)}
:::

`
