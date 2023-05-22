import Dialog, { useDialog } from "@/components/Dialog";
import { Skill } from "@/skill/type";
import { FC } from "react";

export interface TagsEditorProps {
    tags: Skill["tags"]
    onNew: () => void
    onChange: (i: number, tag: Skill["tags"][number]) => void
    onDelete: (i: number) => void
}
export const TagsEditor: FC<TagsEditorProps> = ({ tags, onNew, onChange, onDelete }) => {
    return (
        <>
            {tags.map((tag, i) =>
                <TagEditor
                    key={i}
                    tag={tag}
                    onChange={(tag) => onChange(i, tag)}
                    onDelete={() => onDelete(i)}
                />
            )}
            <div className="badge badge-outline" onClick={onNew}>
                +
            </div>
        </>
    );
}

interface TagEditorProps {
    tag: Skill["tags"][number]
    onChange: (tag: Skill["tags"][number]) => void
    onDelete: () => void
}
const TagEditor: FC<TagEditorProps> = ({ tag, onChange, onDelete }) => {
    const { dialogProps, toggle, hide } = useDialog()
    return (
        <>
            <div className="badge badge-outline" onClick={toggle}>
                {tag}
            </div>
            <Dialog {...dialogProps}>
                <div className="my-2">
                    タグの編集
                </div>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={tag}
                    onChange={e => onChange(e.target.value)}
                    autoFocus
                />
                <div className="flex justify-between my-2">
                    <button className="btn btn-error" onClick={() => {
                        hide()
                        setTimeout(() => {
                            onDelete()
                        }, 100)
                    }}>
                        削除
                    </button>
                    <button className="btn btn-primary" onClick={hide}>
                        OK
                    </button>
                </div>
            </Dialog>
        </>
    );
}
