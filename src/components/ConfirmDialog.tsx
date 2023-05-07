import { FC, ReactNode, useState } from "react";
import Dialog, { DialogProps, useDialog } from "./Dialog";

interface ConfirmDialogProps extends DialogProps {
    onOk: () => void
}
const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
    return (
        <Dialog
            {...props}
        >
            {props.children}
            <div className="modal-action">
                <button className="btn btn-outline" onClick={props.onClose}>キャンセル</button>
                <button className="btn btn-error" onClick={() => {
                    props.onClose()
                    props.onOk()
                }}>OK</button>
            </div>
        </Dialog>
    );
}

export default ConfirmDialog;

export function useConfirm(onOk: () => void) {
    const dialog = useDialog()
    const [message, setMessage] = useState<null | ReactNode>(null)
    const confirm = (message: string = "OK?") => {
        dialog.show()
        setMessage(message)
    }
    const handleOk = () => {
        dialog.hide()
        onOk()
    }
    const dialogProps = {
        ...dialog.dialogProps,
        children: message,
        onOk: handleOk,
    } as const
    const content = <ConfirmDialog
        {...dialogProps}
    />
    return {
        ...dialog,
        dialogProps,
        confirm,
        content,
    } as const
}
