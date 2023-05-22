import { md } from "@/markdown/shortcut"
import dedent from "dedent-js"
export const common = dedent`

# 共通

- 日付や時刻のデータはすべてJavaScriptの${md.c("Date")}クラスを使って生成しているため、UTC (協定世界時)での1970年1月1日0時0分0秒から経過時間をミリ秒数で数えた数です。

`
