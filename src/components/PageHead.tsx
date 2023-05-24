import Head from "next/head";
import { FC } from "react";

interface PageHeadProps {
    path: string
    title?: string
    description?: string
    image?: string
    imageWidth?: number
    imageHeight?: number
}
const PageHead: FC<PageHeadProps> = ({
    path, title = "TBSten", description = "TBStenのポートフォリオサイトです。",
    image = "https://tbsten.me/tbsten500x500.png",
    imageWidth = 2048, imageHeight = 2048
}) => {
    return (
        <Head>
            <title>
                {title}
            </title>

            <meta name="description" content={description} />

            {/* ogp */}
            <meta property="og:url" content={`https://tbsten.me${path}`} />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content="TBSten" />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content={String(imageWidth)} />
            <meta property="og:image:height" content={String(imageHeight)} />

            {/* twitter card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@tbs__ten" />
            <meta name="twitter:domain" content="tbsten.me" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
export default PageHead

