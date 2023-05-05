import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

interface DrawerProps {
    open: boolean
    onClose: () => void
    children?: ReactNode
}
const Drawer: FC<DrawerProps> = ({ open, onClose, children }) => {
    const duration = "duration-300"
    return (
        <div className={classNames(
            "fixed left-0 top-0 w-screen h-screen z-30", duration,
            {
                "visible opacity-100": open,
                "invisible opacity-0": !open,
            },
        )}>
            {/* overlay */}
            <div
                className={classNames(
                    "bg-opacity-30 bg-black absolute left-0 top-0 w-full h-full", duration,
                )}
                onClick={onClose}
            />
            {/* content */}
            <div className={classNames(
                "absolute left-0 top-0", duration,
                "w-full max-w-full h-fit max-h-fit md:w-fit md:max-w-full md:h-full md:max-h-full",
                {
                    "md:translate-x-0 translate-y-0": open,
                    "md:-translate-x-8 translate-y-1": !open,
                },
            )}>
                {children}
            </div>
        </div>
    );
}

export default Drawer;

export function useDrawer() {
    const [open, setOpen] = useState(false)
    const show = () => setOpen(true)
    const hide = () => setOpen(false)
    const toggle = () => setOpen(p => !p)
    const drawerProps: DrawerProps = {
        open, onClose: hide,
    }
    return {
        open,
        drawerProps,
        show, hide, toggle,
    } as const
}

interface DrawerContentProps {
    children?: ReactNode
}
export const DrawerContent: FC<DrawerContentProps> = ({ children }) => {
    return (
        <div className="p-1 w-full max-w-full h-fit max-h-full md:w-fit md:max-w-full md:h-full relative">
            <div className={classNames(
                "bg-base-100 p-2 md:p-4 rounded-md",
                "w-full h-fit max-h-full md:w-fit md:min-w-[300px] md:h-full md:max-w-full",
            )}>
                {children}
            </div>
        </div>
    );
}
