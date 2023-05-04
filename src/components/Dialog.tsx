import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

interface DialogProps {
    open: boolean
    onClose: () => void
    children?: ReactNode
}
const Dialog: FC<DialogProps> = ({ open, onClose, children }) => {
    return (
        <div className={classNames("modal", { "modal-open": open })} onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Dialog;

export function useDialog() {
    const [open, setOpen] = useState(false)
    const show = () => setOpen(true)
    const hide = () => setOpen(false)
    const dialogProps = {
        open, onClose: hide,
    }
    return {
        open,
        dialogProps,
        show, hide,
    } as const
}
