import { signOutAdmin } from '@/auth/client';
import LoadingFallback from '@/components/LoadingFallback';
import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useMonologList, useMonologMutation } from '@/monolog/client';
import MonologList from '@/monolog/component/MonologList';
import { Monolog, NewMonolog, NewMonologSchema, UpdateMonolog } from '@/monolog/type';
import { ssrOfRequireAuth } from '@/server/ssr';
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from "react-hook-form";

interface Props {
}
const AdminTop: NextPage<Props> = ({ }) => {
    const { register, handleSubmit, reset, setError, formState: { isValid } } = useForm<NewMonolog>({
        resolver: zodResolver(NewMonologSchema),
        defaultValues: {
            slug: "",
            draft: "",
        },
    })
    const {
        changeMonolog, currentChangingSlug,
        deleteMonolog, currentDeletingSlug,
        addDraft, isAddingDraft,
    } = useMonologMutation({
        add: {
            async onSuccess() {
                await refetch()
                return reset()
            },
            async onError() {
                setError("root", { message: "エラーが発生しました。" })
            },
        },
    })
    const handleNewDraft = handleSubmit(async (input) =>
        await addDraft(input)
    )
    const { monologList, refetch } = useMonologList({ sortBy: "createAt" })

    const handleChangeMonolog = async (slug: string, input: UpdateMonolog) => {
        await changeMonolog({ slug, input })
        refetch()
    }
    const handleDeleteMonolog = async (slug: string) => {
        await deleteMonolog({ slug })
        refetch()
    }

    return (
        <BasicLayout>
            <PageTitle>
                Admin Page
            </PageTitle>
            <div className='w-full overflow-x-auto px-2 py-8'>
                <button className='btn' onClick={() => signOutAdmin()}>log out</button>
            </div>

            <div className='divider' />
            <AdminMenu />

            <MonologSection
                {...{ isAddingDraft, isValid, }}
                onChange={handleChangeMonolog}
                onDelete={handleDeleteMonolog}
                monologList={monologList ?? null}
                onNewDraft={handleNewDraft}
                inputSlugProps={register("slug")}
                inputDraftProps={register("draft")}
                currentChangingSlug={currentChangingSlug ?? null}
                currentDeletingSlug={currentDeletingSlug ?? null}
            />
        </BasicLayout>
    );
}
export default AdminTop;

export const getServerSideProps: GetServerSideProps<Props> = ssrOfRequireAuth()

interface AdminMenuProps {
}
const AdminMenu: FC<AdminMenuProps> = () => {
    return (
        <LayoutContent>
            <div className="">
                <Link href={`#monolog`} className='link link-primary text-xl'>
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
        </LayoutContent>
    );
}

interface MonologSectionProps {
    isAddingDraft: boolean
    onNewDraft: () => void
    inputSlugProps: JSX.IntrinsicElements["input"]
    inputDraftProps: JSX.IntrinsicElements["textarea"]
    isValid: boolean
    monologList: Monolog[] | null
    currentChangingSlug: string | null
    currentDeletingSlug: string | null
    onChange: (slug: string, input: UpdateMonolog) => void
    onDelete: (slug: string) => void
}
const MonologSection: FC<MonologSectionProps> = ({
    isAddingDraft,
    onNewDraft,
    inputSlugProps, inputDraftProps,
    isValid,
    monologList,
    currentChangingSlug, currentDeletingSlug,
    onChange, onDelete,
}) => {
    return (
        <>
            <div className="divider" id="monolog">
                独り言
            </div>
            <LayoutContent>
                <Container>
                    <LoadingFallback isLoading={isAddingDraft}>
                        <form onSubmit={onNewDraft}>
                            <div className="my-2">
                                <input
                                    type="text"
                                    placeholder='slug (任意)'
                                    className="input input-bordered w-full"
                                    {...inputSlugProps}
                                />
                            </div>
                            <div className="my-2 flex gap-1 flex-col md:flex-row md:items-center">
                                <textarea
                                    placeholder='内容'
                                    className="textarea textarea-bordered flex-grow"
                                    rows={5}
                                    {...inputDraftProps}
                                ></textarea>
                                <button type="submit" className='btn btn-primary ml-4 md:ml-0'>
                                    下書き
                                </button>
                            </div>
                            {!isValid &&
                                <div className="alert alert-error">
                                    エラーが発生しました
                                </div>
                            }
                        </form>
                    </LoadingFallback>
                    <div className="py-4 px-2 md:px6">
                        {monologList
                            ? <MonologList
                                monologList={monologList}
                                editable
                                onChange={onChange}
                                onDelete={onDelete}
                                changingSlug={currentChangingSlug ?? undefined}
                                deletingSlug={currentDeletingSlug ?? undefined}
                            />
                            : <>...</>}
                    </div>
                </Container>
            </LayoutContent>

        </>
    );
}

