import Dialog, { useDialog } from "@/components/Dialog";
import MarkdownText from "@/components/MarkdownText";
import { FC, ReactNode, useState } from "react";

interface InputMonologProps {
    content: string
    inputSlugProps: JSX.IntrinsicElements["input"]
    inputContentProps: JSX.IntrinsicElements["textarea"]
    isValid: boolean
    action?: ReactNode
}
const InputMonolog: FC<InputMonologProps> = ({ content, inputSlugProps, inputContentProps, isValid, action, }) => {
    const previewDialog = useDialog()
    const [showSlug, setShowSlug] = useState(false)
    return (
        <div>
            <div className="my-2 flex gap-1 flex-col md:flex-row md:items-center">
                {/* 内容編集 */}
                <textarea
                    placeholder='内容'
                    className="textarea textarea-bordered flex-grow resize-y"
                    rows={content.split("\n").length + 3}
                    {...inputContentProps}
                ></textarea>
                <div className="flex flex-col gap-1">
                    {/*  */}
                    {showSlug ?
                        <input
                            placeholder="slug"
                            className="input input-bordered"
                            {...inputSlugProps}
                        />
                        : <button type="button" className="btn btn-info" onClick={() => setShowSlug(true)}>
                            slugを編集
                        </button>
                    }
                    {/* プレビュー */}
                    <button type="button" className="btn  btn-info" onClick={previewDialog.show}>
                        プレビュー
                    </button>
                    {action}
                </div>

            </div>
            {!isValid &&
                <div className="alert alert-error">
                    エラーが発生しました
                </div>
            }

            <Dialog {...previewDialog.dialogProps}>
                <div className="text-xl font-bold">
                    プレビュー
                </div>
                <div className="">
                    <MarkdownText
                        markdown={content}
                    />
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={previewDialog.hide}>閉じる</button>
                </div>
            </Dialog>
        </div>
    );
}

export default InputMonolog;
