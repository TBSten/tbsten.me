import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

export interface DialogProps {
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

export function useDialog(options: {
    open?: boolean,
    setOpen?: (open: boolean) => void
} = {}) {
    const [internalOpen, setInternalOpen] = useState(false)

    const open = typeof options.open === "boolean" ? options.open : internalOpen
    const setOpen = typeof options.setOpen === "function" ? options.setOpen : setInternalOpen

    const show = () => setOpen(true)
    const hide = () => setOpen(false)
    const toggle = () => setOpen(!open)

    const dialogProps = {
        open, onClose: hide,
    } satisfies Partial<DialogProps>
    return {
        open,
        dialogProps,
        show, hide, toggle,
    } as const
}
