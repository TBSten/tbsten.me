import { Monolog } from "./type";

export const dummyMonologs: Monolog[] = [
    {
        slug: "test-1",
        draft: "これは テスト用記事 1 です。\nこのように**マークダウンでもOK**です。",
        isPublished: false,
        publishedContent: null,
        createAt: 0,
        updateAt: 0,
        publishAt: 0,
    },
]
