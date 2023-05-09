import LayoutContent from "@/components/layout/LayoutContent";
import Link from "next/link";
import { FC } from "react";

interface AdminMenuProps {
}
const AdminMenu: FC<AdminMenuProps> = () => {
    return (
        <div>

            <div className="">
                <Link href={`/admin/#monolog`} className='link link-primary text-xl'>
                    {">"} 独り言
                </Link>
            </div>
            <div className="">
                <Link href={`/admin/skill`} className='link link-primary text-xl'>
                    {">"} スキル
                </Link>
            </div>
            <div className="">
                <Link href={`/admin/work`} className='link link-primary text-xl'>
                    {">"} 作ったもの
                </Link>
            </div>
        </div>
    );
}

export default AdminMenu;


interface AdminMenuSectionProps extends AdminMenuProps {
}
export const AdminMenuSection: FC<AdminMenuSectionProps> = ({ ...adminMenuProps }) => {
    return (
        <LayoutContent>
            <AdminMenu {...adminMenuProps} />
        </LayoutContent>
    );
}

