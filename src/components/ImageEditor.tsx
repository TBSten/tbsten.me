import { useResource } from "@/resource/client";
import { Resource } from "@/resource/type";
import { useUpload } from "@/upload/client";
import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import Dialog, { DialogProps, useDialog } from "./Dialog";
import Loading from "./Loading";

interface ImageEditorPreviewProps {
    src: string | null
    isUploading: boolean
}

interface ImageEditorProps extends DialogProps {
    src: ImageProps["src"]
    onChange: (newSrc: string | null) => void
    className?: string
    title?: ReactNode
    imagePreview?: (props: ImageEditorPreviewProps) => ReactNode
}
const ImageEditor: FC<ImageEditorProps> = ({
    src, onChange, className,
    title = "画像のアップロード",
    imagePreview = (props) => <DefaultImageEditorPreview {...props} />,
    ...dialogProps
}) => {
    const { upload, isUploading, url } = useUpload()
    const [tab, setTab] = useState<"upload" | "select">("upload")
    const { resources } = useResource()
    const [selectedRes, setSelectedRes] = useState<null | Resource>(null)
    return (
        <>
            <Dialog {...dialogProps}>
                <div className="text-xl font-bold">
                    {title}
                </div>
                <div className={classNames(
                    "m-2 md:my-6",
                )}>
                    <div className="tabs">
                        <div className={classNames("tab tab-bordered", { "tab-active": tab === "upload" })} onClick={() => setTab("upload")}>
                            アップロード
                        </div>
                        <div className={classNames("tab tab-bordered", { "tab-active": tab === "select" })} onClick={() => setTab("select")}>
                            選ぶ
                        </div>
                    </div>
                    {tab === "upload" &&
                        <div className={classNames(
                            "p-6 md:py-12 my-2 ",
                            "bg-secondary bg-opacity-25 border-2 border-secondary rounded-lg",
                            "flex flex-col justify-center items-center",
                        )}>
                            {
                                imagePreview({
                                    src: url,
                                    isUploading,
                                })
                            }
                            {isUploading &&
                                <Loading />
                            }
                            <button className="btn btn-wide btn-secondary" onClick={() => upload()}>
                                アップロード
                            </button>
                        </div>
                    }
                    {tab === "select" &&
                        <>
                            <div className="my-2 max-h-[40vh] overflow-auto ">
                                {resources?.map(res =>
                                    <div key={res.publicUrl}
                                        className={classNames(
                                            "p-2 flex gap-1 md:gap-3 border hover:border-secondary  cursor-pointer",
                                            selectedRes === res ? "border-secondary" : "border-transparent"
                                        )}
                                        onClick={() => setSelectedRes(res)}
                                    >
                                        {res.mime?.match(/^image\/(.*)$/) &&
                                            <Image
                                                className="object-contain inline"
                                                src={res.publicUrl}
                                                alt={res.name}
                                                width={30}
                                                height={30}
                                            />
                                        }
                                        <span className="flex-grow break-all">
                                            {res.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="px-4 md:px-8 w-full flex justify-center my-2">
                                <Link className="btn btn-outline btn-sm" href="/admin/resource">
                                    公開リソースの管理
                                </Link>
                            </div>
                        </>
                    }
                </div>
                <div className="modal-action">
                    <button className="btn" onClick={dialogProps.onClose}>
                        キャンセル
                    </button>
                    <button className="btn btn-secondary min-w-[100px]" onClick={() => {
                        dialogProps.onClose()
                        if (tab === "upload") {
                            onChange(url)
                        }
                        if (tab === "select" && selectedRes) {
                            onChange(selectedRes.publicUrl)
                        }
                    }}>
                        OK
                    </button>
                </div>
            </Dialog>
        </>
    );
}

export default ImageEditor;

export function useImageEditor() {
    const dialog = useDialog()
    const imageEditorProps = {
        ...dialog.dialogProps,
    } as const satisfies Partial<ImageEditorProps>
    return {
        show: dialog.show,
        hide: dialog.hide,
        toggle: dialog.toggle,
        dialog,
        imageEditorProps,
    } as const
}

export const DefaultImageEditorPreview: FC<ImageEditorPreviewProps> = ({ src, isUploading }) => {
    return (
        <div>
            {src ?
                <Image
                    className={classNames(
                        "my-2 md:my-6 bg-base-100",
                        { "brightness-50": isUploading }
                    )}
                    src={src}
                    alt="アップロードした画像"
                    width={75} height={75}
                />
                : <>
                    画像がありません
                </>
            }
        </div>
    );
}
