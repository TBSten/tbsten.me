import AdminMenu from '@/admin/components/AdminMenu';
import ConfirmDialog, { useConfirm } from '@/components/ConfirmDialog';
import Dialog, { useDialog } from '@/components/Dialog';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { getResources } from '@/resource/server';
import { Resource, ResourceSchema } from '@/resource/type';
import { ssrOf } from '@/server/ssr';
import { useUpload } from '@/upload/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillFileText } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    resources: Resource[]
}
const AdminResourcePage: NextPage<Props> = ({ resources: defaultResources }) => {
    const { data: resources, refetch: refreshResources } = useQuery({
        queryKey: ["resources"],
        queryFn: () =>
            fetch("/api/resource")
                .then(r => r.json())
                .then(r => ResourceSchema.array().parse(r)),
        initialData: defaultResources,
    })
    const upload = useUpload()
    const { mutateAsync: deleteResource } = useMutation({
        mutationFn: async ({ name }: Resource) => {
            await fetch(`/api/resource?path=${name}`, {
                method: "DELETE",
            }).then(r => r.json())
            refreshResources()
        }
    })
    const handleDelete = (res: Resource) => async () => {
        await deleteResource(res)
        refreshResources()
    }
    return (
        <BasicLayout>
            <PageTitle>
                Admin:
                公開リソース
            </PageTitle>
            <LayoutContent>
                <AdminMenu />
            </LayoutContent>
            <LayoutContent className='bg-base-200'>
                <div className="px-4 md:px-8 flex justify-center">
                    <button className="btn btn-primary btn-wide" onClick={() => upload.upload()}>
                        追加
                    </button>
                </div>
            </LayoutContent>
            <LayoutContent className='bg-base-200'>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4">
                    {resources.map(res =>
                        <div key={res.publicUrl}>
                            <ResourceListItem
                                resource={res}
                                onDelete={handleDelete(res)}
                            />
                        </div>
                    )}
                </div>
            </LayoutContent>
        </BasicLayout>
    );
}
export default AdminResourcePage;

interface ResourceListItemProps {
    resource: Resource
    onDelete?: () => void
}
const ResourceListItem: FC<ResourceListItemProps> = ({ resource: { name, publicUrl, mime }, onDelete }) => {
    const isImage = mime?.match(/^image\/.*$/)
    const detailDialog = useDialog()
    const deleteConfirm = useConfirm(async () => {
        onDelete && onDelete()
    })
    return (
        <div className='rounded-lg overflow-hidden bg-base-100'>
            {isImage ?
                <Image
                    className='object-contain aspect-video w-full'
                    src={publicUrl}
                    alt={name}
                    width={300}
                    height={200}
                    onClick={detailDialog.show}
                />
                : <div className='flex justify-center items-center p-2 bg-base-content aspect-video'>
                    <AiFillFileText className='text-4xl text-base-100' />
                </div>
            }
            <div className='px-3 py-1 flex justify-between'>
                <Link
                    href={publicUrl}
                    target='_blank'
                    className='link link-secondary break-all'
                >
                    {name.substring(0, 10)}
                    {name.length >= 10 && "..."}
                </Link>
                <button className='btn btn-circle btn-sm btn-ghost' onClick={detailDialog.show}>
                    <BsThreeDotsVertical />
                </button>
            </div>

            <Dialog {...detailDialog.dialogProps}>
                <div className="font-bold text-lg">
                    {name}
                </div>
                <div className="overflow-x-auto pl-4 my-4">
                    <table>
                        <tbody>
                            <tr>
                                <td>URL</td>
                                <td>
                                    <Link
                                        className='link link-secondary'
                                        href={publicUrl}
                                        target='_blank'
                                    >
                                        {publicUrl}
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>種類</td>
                                <td>
                                    {isImage
                                        ? `画像 (${mime?.match(/^image\/(.*)$/)?.[1]})`
                                        : mime}
                                </td>
                            </tr>
                            {isImage &&
                                <tr>
                                    <td colSpan={2}>
                                        <Image
                                            src={publicUrl}
                                            alt={name}
                                            width={200}
                                            height={200}
                                        />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="my-4 flex justify-end">
                    <button className="btn btn-secondary">
                        ダウンロード
                    </button>
                </div>
                <div className="mt-2 flex justify-between">
                    <button className="btn btn-sm btn-error" onClick={() => deleteConfirm.confirm()}>
                        削除
                    </button>
                    <button className='btn btn-sm' onClick={detailDialog.hide}>
                        閉じる
                    </button>
                </div>
            </Dialog>
            <ConfirmDialog {...deleteConfirm.dialogProps}>
                <p>
                    {name}を
                    削除しますか?
                </p>
                <p>
                    削除するとリソースのリンクが無効になります。
                </p>
            </ConfirmDialog>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = ssrOf({
    requireAuth: true,
    hanlder: async (ctx) => {
        const resources = await getResources()
        return {
            props: { resources },
        }
    },
})

