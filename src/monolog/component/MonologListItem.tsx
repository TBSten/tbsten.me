import Dialog, { useDialog } from "@/components/Dialog";
import LoadingFallback from "@/components/LoadingFallback";
import classNames from "classnames";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Monolog, UpdateMonolog } from "../type";

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
    const content = monolog.publishedContent ?? monolog.draft
    const handleDelete = () => {
        onDelete && onDelete()
        deleteDialog.hide()
    }
    const [contentOpen, setContentOpen] = useState(false)
    const [metaDataOpen, setMetaDataOpen] = useState(false)
    return (
        <>
            <div className="flex flex-col border border-primary text-primary p-2 my-4">
                <div className={classNames(
                    "w-full overflow-x-auto mb-8",
                    contentOpen ? "max-h-fit" : "max-h-40",
                )} onClick={() => setContentOpen(p => !p)}>
                    {/* contents */}
                    {content}
                </div>
                <div className="border-t w-full border-secondary" />
                <div className="flex flex-col md:flex-row px-2 py-1">
                    <div className={classNames(
                        "flex-grow overflow-y-hidden",
                        metaDataOpen ? "max-h-fit" : "max-h-20",
                    )} onClick={() => setMetaDataOpen(p => !p)}>
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
                        {onDelete &&
                            <div className="form-control w-fit">
                                <LoadingFallback isLoading={!!isDeleting}>
                                    <button
                                        className="btn btn-error"
                                        onClick={deleteDialog.show}
                                        disabled={!editable && isDeleting}
                                    >削除</button>
                                </LoadingFallback>
                            </div>
                        }
                    </div>
                </div>
            </div>
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
        </>
    );
}

export default MonologListItem;