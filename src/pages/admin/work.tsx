import { AdminMenuSection } from '@/admin/components/AdminMenu';
import { useDialog } from '@/components/Dialog';
import ImageEditor from '@/components/ImageEditor';
import Loading from '@/components/Loading';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { ssrOfRequireAuth } from '@/server/ssr';
import { useWorks } from '@/work/client';
import WorkCard, { DefaultWorkCardImage } from '@/work/components/WorkCard';
import { Work } from '@/work/type';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';

interface Props {
}
const AdminWorksPage: NextPage<Props> = ({ }) => {
    const { works, isLoading, save, isSaving } = useWorks()
    const [editWorks, setEditWorks] = useState(works)
    useEffect(() => {
        if (!works) return
        setEditWorks(works)
    }, [works])

    const handleChangeWork = (idx: number, input: Partial<Work>) => {
        setEditWorks(p => p?.map((work, i) => idx === i ?
            { ...work, ...input } :
            work
        ))
    }
    const handleSave = async () => {
        if (!editWorks) return
        save(editWorks)
    }
    return (
        <BasicLayout>
            <PageTitle>
                Admin:
                作ったもの
            </PageTitle>

            <AdminMenuSection />

            <LayoutContent>
                {isLoading && <Loading />}
                {works &&
                    editWorks?.map((work, idx) =>
                        <InputWorkCard
                            key={idx}
                            work={work}
                            onChangeTitle={title => handleChangeWork(idx, { title })}
                            onChangeDetail={detail => handleChangeWork(idx, { detail })}
                            onChangeImage={image => handleChangeWork(idx, { image })}
                            onChangeLink={link => handleChangeWork(idx, { link })}
                        />
                    )
                }
                <button className="btn btn-accent shadow fixed bottom-8 right-2 rounded-full" onClick={handleSave}>
                    <span className="px-8">
                        保存
                    </span>
                </button>
            </LayoutContent>
        </BasicLayout>
    );
}
export default AdminWorksPage;

export const getServerSideProps = ssrOfRequireAuth()

export interface InputWorkCardProps {
    work: Work
    onChangeTitle: (title: string) => void
    onChangeDetail: (detail: string) => void
    onChangeImage: (image: string) => void
    onChangeLink: (link: string) => void
}
export const InputWorkCard: FC<InputWorkCardProps> = ({
    work,
    onChangeTitle, onChangeDetail, onChangeImage, onChangeLink,
}) => {
    return (
        <WorkCard
            work={work}
            disableLink
            slots={{
                title: work => (
                    <input
                        className='input input-bordered '
                        value={work.title}
                        onChange={e => onChangeTitle(e.target.value)}
                    />
                ),
                detail: work => (
                    <textarea
                        className='textarea textarea-bordered w-full my-1'
                        rows={Math.max(3, work.detail.split("\n").length)}
                        value={work.detail}
                        onChange={e => onChangeDetail(e.target.value)}
                    ></textarea>
                ),
                image: work => (
                    <InputWorkCardImage
                        work={work}
                        onChange={onChangeImage}
                    />
                ),
                action: work => (
                    <div className='w-full flex justify-end items-center flex-wrap'>
                        リンク
                        <input
                            type="text"
                            className="input input-bordered min-w-[50%]"
                            value={work.link}
                            onChange={e => onChangeLink(e.target.value)}
                        />
                    </div>
                ),
            }}
        />
    );
}

interface InputWorkCardImageProps {
    work: Work
    onChange: (src: string) => void
}
const InputWorkCardImage: FC<InputWorkCardImageProps> = ({ work, onChange }) => {
    const { dialogProps, toggle } = useDialog()
    return (
        <>
            <div
                onClick={toggle}
            >
                <DefaultWorkCardImage
                    work={work}
                />
            </div>
            <ImageEditor
                {...dialogProps}
                src={work.image}
                onChange={(src) => src && onChange(src)}
            />
        </>
    );
}
