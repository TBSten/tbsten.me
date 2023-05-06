import { signOutAdmin } from '@/auth/client';
import LoadingFallback from '@/components/LoadingFallback';
import BasicLayout from '@/components/layout/BasicLayout';
import Container from '@/components/layout/Container';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { useMonologList, useMonologMutation } from '@/monolog/client';
import MonologList from '@/monolog/component/MonologList';
import { NewMonolog, NewMonologSchema, UpdateMonolog } from '@/monolog/type';
import { ssrOfRequireAuth } from '@/server/ssr';
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps, NextPage } from 'next';
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

            <div className="divider">
                独り言
            </div>
            <LayoutContent>
                <Container>
                    <LoadingFallback isLoading={isAddingDraft}>
                        <form onSubmit={handleNewDraft}>
                            <div className="my-2">
                                <input
                                    type="text"
                                    placeholder='slug (任意)'
                                    className="input input-bordered w-full"
                                    {...register("slug")}
                                />
                            </div>
                            <div className="my-2 flex gap-1 flex-col md:flex-row md:items-center">
                                <textarea
                                    placeholder='内容'
                                    className="textarea textarea-bordered flex-grow"
                                    rows={5}
                                    {...register("draft")}
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
                    <div className="my-4">
                        {monologList
                            ? <MonologList
                                monologList={monologList}
                                editable
                                onChange={handleChangeMonolog}
                                onDelete={handleDeleteMonolog}
                                changingSlug={currentChangingSlug ?? undefined}
                                deletingSlug={currentDeletingSlug ?? undefined}
                            />
                            : <>...</>}
                    </div>
                </Container>
            </LayoutContent>
        </BasicLayout>
    );
}
export default AdminTop;

export const getServerSideProps: GetServerSideProps<Props> = ssrOfRequireAuth()


