import Image, { ImageProps } from "next/image";
import { FC, useEffect, useState } from "react";
import Loading from "./Loading";

interface FileImageProps extends Omit<ImageProps, "src"> {
    file: File
    alt: string
}
const FileImage: FC<FileImageProps> = ({ file, alt, ...imgProps }) => {
    const [dataUrl, setDataUrl] = useState<null | string>(null)
    useEffect(() => {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            if (typeof reader.result !== "string") throw new TypeError("not implement . invalid reader result")
            setDataUrl(reader.result)
        })
        reader.readAsDataURL(file)
    }, [file])
    if (!dataUrl) return <Loading />
    return <Image
        src={dataUrl}
        alt={alt}
        {...imgProps}
    />
}

export default FileImage;
