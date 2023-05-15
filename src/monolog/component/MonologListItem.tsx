import { useCopy } from "@/client/copy";
import Dialog, { useDialog } from "@/components/Dialog";
import Loading from "@/components/Loading";
import LoadingFallback from "@/components/LoadingFallback";
import MarkdownText from "@/components/MarkdownText";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Monolog, UpdateMonolog, UpdateMonologSchema } from "../type";
import InputMonolog from "./InputMonolog";

interface MonologListItemProps {
    monolog: Monolog
    editable?: boolean
    onDelete?: () => void
    onChange?: (input: UpdateMonolog) => void
    isChanging?: boolean
    isDeleting?: boolean
}
const MonologListItem: FC<MonologListItemProps> = ({
    monolog,
    editable,
    onDelete,
    onChange,
    isChanging,
    isDeleting,
}) => {
    const deleteDialog = useDialog()
    const content = monolog.content
    const handleDelete = () => {
        onDelete && onDelete()
        deleteDialog.hide()
    }
    const [contentOpen, setContentOpen] = useState(false)
    const [metaDataOpen, setMetaDataOpen] = useState(false)

    const editDialog = useDialog()
    const { register, handleSubmit, watch, setValue, formState: { isValid, } } = useForm<UpdateMonolog>({
        resolver: zodResolver(UpdateMonologSchema),
        defaultValues: {
            type: "update",
            slug: null,
            content: monolog.content,
        },
    })
    const handleSaveChange = handleSubmit(async (UpdateMonolog) => {
        onChange && onChange(UpdateMonolog)
        editDialog.hide()
    })

    const { copy, isCoping, isSuccess, isError } = useCopy()
    const handleCopyUrl = () => {
        copy(`https://tbsten.me/monolog#${monolog.slug}`)
    }
    return (
        <>
            <div className="flex flex-col border border-primary text-primary p-2 my-4">
                <div className={classNames(
                    "w-full overflow-x-auto overflow-y-hidden mb-8",
                    contentOpen ? "max-h-fit" : "max-h-40",
                )} onClick={() => setContentOpen(p => !p)}>
                    {/* contents */}
                    <MarkdownText
                        markdown={content}
                    />
                </div>
                <div className="border-t w-full border-secondary" />
                <div className="flex flex-col md:flex-row px-2 py-1">
                    <div className={classNames(
                        "flex-grow overflow-y-hidden",
                    )} onClick={() => setMetaDataOpen(p => !p)}>
                        {metaDataOpen && <>
                            {/* meta data */}
                            <div className="">
                                slug:
                                <span className="font-bold">
                                    {monolog.slug}
                                </span>
                            </div>
                            {editable &&
                                <>
                                    <div className="">
                                        作成日時:
                                        <span className="font-bold">
                                            {dayjs(monolog.createAt).format("MM/DD")}
                                        </span>
                                    </div>
                                    <div className="">
                                        更新日時:
                                        <span className="font-bold">
                                            {dayjs(monolog.updateAt).format("MM/DD")}
                                        </span>
                                    </div>
                                </>
                            }
                        </>}
                        <div className="">
                            公開日時:
                            <span className="font-bold">
                                {monolog.publishAt
                                    ? dayjs(monolog.publishAt).format("MM/DD")
                                    : "なし"
                                }
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                        {/* actions */}
                        <div className="form-control w-fit">
                            <LoadingFallback isLoading={!!isChanging} className="">
                                <label className={classNames(
                                    monolog.isPublished ? "text-secondary" : "text-base-content",
                                    "label cursor-pointer flex flex-row items-center",
                                )}>
                                    {monolog.isPublished && "公開中"}
                                    {!monolog.isPublished && "非公開"}
                                    <input
                                        type="checkbox"
                                        className={classNames("checkbox ", { "checkbox-secondary": monolog.isPublished })}
                                        disabled={!editable && isChanging}
                                        checked={monolog.isPublished}
                                        onChange={e => {
                                            if (!onChange) return
                                            const checked = e.target.checked
                                            if (checked) {
                                                onChange({ type: "publish" })
                                            } else {
                                                onChange({ type: "unpublish" })
                                            }
                                        }}
                                    />
                                </label>
                            </LoadingFallback>
                        </div>
                        <div className="w-full flex flex-wrap justify-end gap-1 md:gap-4">
                            <button className={classNames(
                                "btn btn-outline btn-primary",
                                { "btn-disabled": !monolog.isPublished },
                            )} disabled={!monolog.isPublished} onClick={handleCopyUrl}>
                                URLコピー
                            </button>
                            {onDelete &&
                                <LoadingFallback isLoading={!!isDeleting}>
                                    <button
                                        className={classNames(
                                            "btn btn-error",
                                            { "btn-disabled": !editable }
                                        )}
                                        onClick={() => {
                                            if (!editable) return
                                            deleteDialog.show()
                                        }}
                                        disabled={!editable && isDeleting}
                                    >削除</button>
                                </LoadingFallback>
                            }
                            <LoadingFallback isLoading={!!isDeleting}>
                                <button
                                    className={classNames(
                                        "btn btn-secondary",
                                        { "btn-disabled": !editable }
                                    )}
                                    onClick={() => {
                                        if (!editable) return
                                        editDialog.show()
                                        setValue("content", monolog.content)
                                    }}
                                    disabled={!editable && isDeleting}
                                >編集</button>
                            </LoadingFallback>
                        </div>
                    </div>
                </div>
            </div>
            {/* 削除確認 */}
            <Dialog {...deleteDialog.dialogProps}>
                <div className="">
                    削除してもいいですか？
                </div>
                <div className="text-sm">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>slug</td>
                                <td>{monolog.slug}</td>
                            </tr>
                            <tr>
                                <td>内容</td>
                                <td>{content}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-action flex justify-end flex-wrap">
                    <button className="btn" onClick={deleteDialog.hide}>キャンセル</button>
                    <button className="btn btn-error" onClick={handleDelete}>
                        削除する
                    </button>
                </div>
            </Dialog>
            {/* 編集 */}
            <Dialog {...editDialog.dialogProps}>
                <div className="text-xl font-bold">
                    {monolog.content.substring(0, 10) + (monolog.content.length > 10 ? "..." : "")}
                    の編集
                </div>
                <div className="form-control">
                    <InputMonolog
                        content={watch("content")}
                        inputSlugProps={register("slug")}
                        inputContentProps={register("content")}
                        isValid={isValid}
                    />
                </div>
                <div className="modal-action">
                    <button className="btn" onClick={editDialog.hide}>キャンセル</button>
                    <button className="btn btn-primary" onClick={handleSaveChange}>保存</button>
                </div>
            </Dialog>

            {/* toasts */}
            {isCoping &&
                <div className="toast toast-start toast-bottom z-50">
                    <div className="alert shadow alert-info">
                        <Loading />
                    </div>
                </div>
            }
            {isSuccess &&
                <div className="toast toast-start toast-bottom z-50">
                    <div className="alert shadow alert-success">
                        URLをコピーしました!
                    </div>
                </div>
            }
            {isError &&
                <div className="toast toast-start toast-bottom z-50">
                    <div className="alert shadow alert-error">
                        コピーできませんでした...
                    </div>
                </div>
            }
        </>
    );
}

export default MonologListItem;