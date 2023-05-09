import { AdminMenuSection } from '@/admin/components/AdminMenu';
import { signOutAdmin } from '@/auth/client';
import LoadingFallback from '@/components/LoadingFallback';
import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useMonologList, useMonologMutation } from '@/monolog/client';
import InputMonolog from '@/monolog/component/InputMonolog';
import MonologList from '@/monolog/component/MonologList';
import { Monolog, NewMonolog, NewMonologSchema, UpdateMonolog } from '@/monolog/type';
import { ssrOfRequireAuth } from '@/server/ssr';
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps, NextPage } from 'next';
import { FC } from 'react';
import { useForm } from "react-hook-form";

interface Props {
}
const AdminTop: NextPage<Props> = ({ }) => {
    const { register, handleSubmit, watch, reset, setError, formState: { isValid } } = useForm<NewMonolog>({
        resolver: zodResolver(NewMonologSchema),
        defaultValues: {
            slug: "",
            content: "",
        },
    })
    const {
        changeMonolog, currentChangingSlug,
        deleteMonolog, currentDeletingSlug,
        addMonolog, isAddingMonolog,
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
        await addMonolog(input)
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
            <AdminMenuSection />

            <MonologSection
                {...{ isAddingMonolog, isValid, }}
                onChange={handleChangeMonolog}
                onDelete={handleDeleteMonolog}
                monologList={monologList ?? null}
                onNewDraft={handleNewDraft}
                inputSlugProps={register("slug")}
                inputContentProps={register("content")}
                currentChangingSlug={currentChangingSlug ?? null}
                currentDeletingSlug={currentDeletingSlug ?? null}
                content={watch("content")}
            />
        </BasicLayout>
    );
}
export default AdminTop;

export const getServerSideProps: GetServerSideProps<Props> = ssrOfRequireAuth()


interface MonologSectionProps {
    isAddingMonolog: boolean
    onNewDraft: () => void
    inputSlugProps: JSX.IntrinsicElements["input"]
    inputContentProps: JSX.IntrinsicElements["textarea"]
    isValid: boolean
    monologList: Monolog[] | null
    currentChangingSlug: string | null
    currentDeletingSlug: string | null
    onChange: (slug: string, input: UpdateMonolog) => void
    onDelete: (slug: string) => void
    content: string
}
const MonologSection: FC<MonologSectionProps> = ({
    isAddingMonolog,
    onNewDraft,
    inputSlugProps, inputContentProps: inputDraftProps,
    isValid,
    monologList,
    currentChangingSlug, currentDeletingSlug,
    onChange, onDelete,
    content,
}) => {
    return (
        <>
            <div className="divider" id="monolog">
                独り言
            </div>
            <LayoutContent>
                <Container>
                    <LoadingFallback isLoading={isAddingMonolog}>
                        <form onSubmit={onNewDraft}>
                            <InputMonolog
                                {...{ content, inputContentProps: inputDraftProps, inputSlugProps, isValid }}
                                action={
                                    <button type="submit" className='btn btn-primary ml-4 md:ml-0'>
                                        下書き
                                    </button>
                                }
                            />
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

