import Dialog, { useDialog } from "@/components/Dialog";
import ImageEditor, { useImageEditor } from "@/components/ImageEditor";
import MarkdownText from "@/components/MarkdownText";
import { FC, ReactNode, useRef, useState } from "react";

interface InputMonologProps {
    content: string
    inputSlugProps: JSX.IntrinsicElements["input"]
    onChangeContent: (content: string) => void
    isValid: boolean
    action?: ReactNode
}
const InputMonolog: FC<InputMonologProps> = ({ content, onChangeContent, inputSlugProps, isValid, action, }) => {
    const previewDialog = useDialog()
    const [showSlug, setShowSlug] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const imageEditor = useImageEditor()
    const handleSelectImage = (src: string | null) => {
        if (src === null) return
        const textarea = textareaRef.current
        if (!textarea) return
        const cursorPos = textarea.selectionStart
        const newContent = content.substring(0, cursorPos) + `![](${src})` + content.substring(cursorPos, content.length) + "\n"
        onChangeContent(newContent)
        textarea.selectionStart = cursorPos + 4 + (src.length ?? 0) + 1
        textarea.focus()
    }
    return (
        <div>
            <div className="my-2 flex gap-1 flex-col md:flex-row md:items-center">
                {/* 内容編集 */}
                <textarea
                    placeholder='内容'
                    className="textarea textarea-bordered flex-grow resize-y"
                    rows={content.split("\n").length + 3}
                    ref={textareaRef}
                    value={content}
                    onChange={e => onChangeContent(e.target.value)}
                ></textarea>
                <div className="flex flex-col gap-1">
                    {/* 画像 */}
                    <button type="button" className="btn btn-info" onClick={() => imageEditor.show()}>
                        画像
                    </button>
                    {/* slug */}
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

            <ImageEditor
                src={""}
                onChange={handleSelectImage}
                {...imageEditor.imageEditorProps}
            />
        </div>
    );
}

export default InputMonolog;
