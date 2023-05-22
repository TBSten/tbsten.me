import { md } from "@/markdown/shortcut";
import dedent from "dedent-js";

// /api/monolog

const index = dedent`
# GET [${md.c("/api/monolog")}](/api/monolog)

TBStenの独り言を一覧で取得するAPIです。
なお 現在絞り込みには対応しておらず一覧のみ。あしからず...

### リクエスト形式

#### クエリパラメータ

|クエリ|説明|
|---|---|
|${md.c("dir")}|並べ替え順を制御できます。 ${md.c("asc")}を指定すると公開時刻の昇順、${md.c("desc")}を指定すると公開時刻の降順に並び替えられます。デフォルトは${md.c("desc")}です。|

### レスポンス形式

- 独り言オブジェクトの配列
- 独り言オブジェクトとは以下のようなオブジェクトです。

${md.codeBlock("json", `
{
    "slug": 独り言オブジェクトのID,
    "content": 独り言のMarkdown (適宜zenn markdown htmlなどでパースしてください),
    "publishAt": 公開時刻,
    // 以下は内部で使用しているプロパティのため使用は非推奨です
    "isPublished": 公開中か(このAPIでアクセスすると必ずtrueになります),
    "createAt": 作成時刻,
    "updateAt": 更新時刻,
    "random": ランダム値(内部で使用しています),
}
`)}

- 時刻については[共通](#共通)を参照してください

:::details リクエスト例
${md.codeBlock("shell:curlでのリクエスト例1", `
curl https://tbsten.me/api/monolog
`)}
${md.codeBlock("shell:curlでのリクエスト例2", `
curl https://tbsten.me/api/monolog?dir=asc
`)}
${md.codeBlock("js:JavaScriptでのリクエスト例", `
const monologs = await fetch("https://tbsten.me/api/monolog")
    .then(r=>r.json())
`)}
:::

:::details レスポンス例
${md.codeBlock("json", `
[
    {
        "slug": "d271bce8-cbc9-4bf2-ac33-941e4c7c1aff",
        "content": "\`apply\` の型宣言すごいで\\n\\n\`\`\`kotlin\\ninline fun <T> T.apply(block: T.() -> Unit): T\\n\`\`\`\\n\\n> [applyのドキュメント](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/apply.html)",
        "publishAt": 1684286569643,
        "isPublished": true,
        "createAt": 1684240901027,
        "updateAt": 1684240901027,
        "random": 0.2077298804518286
    },
    {
        "slug": "996351dc-b028-493c-a306-3a29cc4c1dc3",
        "content": "jetpack composeの \`dp\` 、実は拡張プロパティ\\n\\n\`\`\`kotlin\\nval Int.dp: Dp\\n\`\`\`\\n\\n> [dpのドキュメント](https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/package-summary#(kotlin.Int).dp())",
        "publishAt": 1684240904051,
        "isPublished": true,
        "createAt": 1684240249925,
        "updateAt": 1684240249925,
        "random": 0.9290079294630915
    },
    ...
]
`)}
:::

`

// /api/monolog/[slug]

const slug = dedent`
# GET ${md.c("/api/monolog/[slug]")}

指定したslugの独り言を取得するAPIです。

### リクエスト形式

|クエリ|説明|
|---|---|
|${md.c("slug")}|独り言のslugを指定してください。|

### レスポンス形式

- 独り言オブジェクト

:::details リクエスト例
${md.codeBlock("shell:curlでのリクエスト例1", `
curl https://tbsten.me/api/monolog/phrase-milabo-1
`)}
${md.codeBlock("js:JavaScriptでのリクエスト例", `
const monolog = await fetch("https://tbsten.me/api/monolog/phrase-milabo-1")
    .then(r=>r.json())
`)}
:::

:::details レスポンス例
${md.cb(`json`, `
{
    "slug": "phrase-milabo-1",
    "content": "変わってくから 私ねもっと\\n\\n> [ずっと真夜中でいいのに。](http://tbsten.me/likes#%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB%E3%80%82) 「MILABO」",
    "createAt": 1683811233994,
    "updateAt": 1683811233994,
    "isPublished": true,
    "publishAt": 1683828392624,
    "random": 0.45503922617166825
}
`)}
:::
`

// /api/monolog/random

const random = dedent`
# GET [${md.c("/api/monolog/random")}](/api/monolog/random)

独り言をランダムで1つ選びます。
**何も選ばれない(nullになる)** こともあります。

### リクエスト形式

なし

(将来的にnullを返さないように指定するパラメータを付与する予定)

### レスポンス形式

:::details リクエスト例
${md.codeBlock("shell:curlでのリクエスト例1", `
curl https://tbsten.me/api/monolog/random
`)}
${md.codeBlock("js:JavaScriptでのリクエスト例", `
const monolog = await fetch("https://tbsten.me/api/monolog/random")
    .then(r=>r.json())
`)}
:::

:::details レスポンス例
${md.cb(`json:レスポンス例1`, `
{
    "slug": "phrase-milabo-1",
    "content": "変わってくから 私ねもっと\\n\\n> [ずっと真夜中でいいのに。](http://tbsten.me/likes#%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB%E3%80%82) 「MILABO」",
    "createAt": 1683811233994,
    "updateAt": 1683811233994,
    "isPublished": true,
    "publishAt": 1683828392624,
    "random": 0.45503922617166825
}
`)}
${md.cb(`json:レスポンス例2`, `
null
`)}
:::

`

export const monolog = [
    index,
    slug,
    random,
].join("\n")

