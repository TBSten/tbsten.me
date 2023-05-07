import { useConfirm } from "@/components/ConfirmDialog"
import Dialog, { DialogProps, useDialog } from "@/components/Dialog"
import FileImage from "@/components/FileImage"
import Loading from "@/components/Loading"
import { Skill } from "@/skill/type"
import { selectFile, uploadFile } from "@/upload/client"
import { randomId } from "@/util/random"
import React, { FC, useState } from "react"
import { SkillCard, SkillCardIcon } from "../SkillCard"
import { AssessmentEditor } from "./AssessmentEditor"
import { InterestEditor } from "./InterestEditor"
import { TagsEditor } from "./TagsEditor"

export interface SkillItemEditorProps {
    skill: Skill
    onChangeName: (name: string) => void
    onChangeIcon: (icon: string) => void
    onChangeAssessment: (assessment: Skill["assessment"]) => void
    onChangeAssessmentMax: (assessment: Skill["assessmentMax"]) => void
    onToggleInterest: () => void
    onShift: (dir: "prev" | "next") => void
    onNewTag: () => void
    onChangeTag: (i: number, tag: Skill["tags"][number]) => void
    onDeleteTag: (i: number) => void
    onDelete: () => void
}
const SkillItemEditorContent: FC<SkillItemEditorProps> = ({
    skill,
    onChangeName, onChangeIcon,
    onChangeAssessment,
    onChangeAssessmentMax,
    onShift,
    onToggleInterest,
    onNewTag, onChangeTag, onDeleteTag,
    onDelete,
}) => {
    const deleteConfirm = useConfirm(() => { onDelete() })
    const uploadDialog = useDialog()
    return (
        <div className="my-8 mx-4 md:my-4">
            <SkillCard
                skill={skill}
                icon={
                    <button className="hover:brightness-50" onClick={uploadDialog.show}>
                        <SkillCardIcon
                            {...skill}
                        />
                    </button>
                }
                name={
                    <input
                        className='input input-bordered w-full'
                        value={skill.name}
                        onChange={e => onChangeName(e.target.value)}
                    />
                }
                primaryTags={
                    <>
                        <AssessmentEditor
                            {...skill}
                            {...{ onChangeAssessment, onChangeAssessmentMax }}
                        />
                        <InterestEditor
                            {...skill}
                            onToggle={onToggleInterest}
                        />
                    </>
                }
                secondaryTags={
                    <TagsEditor
                        {...skill}
                        onNew={onNewTag}
                        onChange={onChangeTag}
                        onDelete={onDeleteTag}
                    />
                }
                actions={
                    <div className='flex justify-between flex-wrap mt-4'>
                        <div className="flex gap-1">
                            <div className="md:-rotate-90">
                                <button className="btn btn-outline btn-square" onClick={() => onShift("prev")}>
                                    ↑
                                </button>
                            </div>
                            <div className="md:-rotate-90">
                                <button className="btn btn-outline btn-square" onClick={() => onShift("next")}>
                                    ↓
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <button className="btn btn-error" onClick={() => deleteConfirm.confirm(`${skill.name} を削除してもいいですか？`)}>
                                削除
                            </button>
                        </div>
                    </div>
                }
                floatOnHover={false}
            />
            <UploadDialog
                onChange={url => onChangeIcon(url)}
                {...uploadDialog.dialogProps}
            />
            {deleteConfirm.content}
        </div>
    );
}

export const SkillItemEditor = React.memo(SkillItemEditorContent)


interface UploadDialogProps extends DialogProps {
    onChange: (url: string) => void
}
const UploadDialog: FC<UploadDialogProps> = ({ onChange, ...props }) => {
    const [name, setName] = useState<string>(randomId() + ".png")
    const [file, setFile] = useState<null | File>(null)
    const [isUploading, setIsUploading] = useState(false)
    const handleUpload = async () => {
        if (!file) return
        setIsUploading(true)
        const publicUrl = await uploadFile(file, name)
        setIsUploading(false)
        props.onClose()
        onChange(publicUrl)
    }
    return (
        <Dialog {...props}>
            <div className="my-2">
                <div className="font-bold">
                    1. ファイル名を決める
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>
            <div className="my-2">
                <div className="font-bold">
                    2. ファイルを選択する
                </div>
                <button className="btn btn-primary" onClick={async () => {
                    const file = await selectFile()
                    if (!file) return
                    setFile(file.item(0))
                }}>
                    選択
                </button>
                <div className="">
                    {file
                        ? <FileImage
                            file={file}
                            alt={file.name}
                            width={100}
                            height={100}
                        />
                        : "(画像を選択してください)"
                    }
                </div>
            </div>
            <div className="my-2">
                <div className="font-bold">
                    3. アップロードする
                </div>
                <button className="btn btn-primary" onClick={handleUpload} disabled={!file || isUploading}>
                    アップロード
                </button>
                {isUploading &&
                    <Loading />
                }
            </div>
            <div className="modal-action justify-end">
                <button className="btn" onClick={props.onClose}>閉じる</button>
            </div>
        </Dialog>
    );
}

