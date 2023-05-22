import Dialog, { useDialog } from "@/components/Dialog"
import { Skill } from "@/skill/type"
import { FC } from "react"
import AssessmentStars from "../SkillCard"

export interface AssessmentEditorProps {
    name: Skill["name"]
    assessment: Skill["assessment"]
    assessmentMax: Skill["assessmentMax"]
    onChangeAssessment: (assessment: Skill["assessment"]) => void
    onChangeAssessmentMax: (assessment: Skill["assessmentMax"]) => void
}
export const AssessmentEditor: FC<AssessmentEditorProps> = ({
    name,
    assessment, assessmentMax,
    onChangeAssessment, onChangeAssessmentMax,
}) => {
    const { toggle, dialogProps, hide } = useDialog()

    return (
        <>
            <div className="badge badge-outline badge-secondary" onClick={toggle}>
                <AssessmentStars
                    {...{ assessment, assessmentMax }}
                />
            </div>
            <Dialog {...dialogProps}>
                <div className="my-2">{name}の評価</div>
                <div className="flex gap-1 justify-center items-center">
                    <input
                        type="number"
                        className='input input-bordered w-16'
                        value={assessment} onChange={e => onChangeAssessment(e.target.valueAsNumber)}
                    />
                    /
                    <input
                        type="number"
                        className='input input-bordered w-16'
                        value={assessmentMax} onChange={e => onChangeAssessmentMax(e.target.valueAsNumber)}
                    />
                </div>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={hide}>
                        OK
                    </button>
                </div>
            </Dialog>
        </>
    );
}