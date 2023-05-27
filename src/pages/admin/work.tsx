import { AdminMenuSection } from '@/admin/components/AdminMenu';
import { useDialog } from '@/components/Dialog';
import ImageEditor from '@/components/ImageEditor';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { ssrOfRequireAuth } from '@/server/ssr';
import { fetchWorks, useSaveWorks } from '@/work/client';
import WorkCard, { DefaultWorkCardImage } from '@/work/components/WorkCard';
import { Work } from '@/work/type';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
}
const AdminWorksPage: NextPage<Props> = ({ }) => {
    const { save, isSaving } = useSaveWorks()
    const [editWorks, setEditWorks] = useState<Work[]>([])
    useEffect(() => {
        fetchWorks().then(works => {
            setEditWorks(works)
        })
    }, [])

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
    const handleExchange = async (idx: number, dir: "prev" | "next") => {
        setEditWorks(p => {
            if (!p) return p
            const newWorks = [...p]
            if (dir === "prev") {
                if (idx === 0) return newWorks
                const w = newWorks[idx]
                newWorks[idx] = newWorks[idx - 1]
                newWorks[idx - 1] = w
            } else {
                if (idx === newWorks?.length - 1) return newWorks
                const w = newWorks[idx]
                newWorks[idx] = newWorks[idx + 1]
                newWorks[idx + 1] = w
            }
            return newWorks
        })
    }
    return (
        <BasicLayout>
            <PageTitle>
                Admin:
                作ったもの
            </PageTitle>

            <AdminMenuSection />

            <LayoutContent>
                {editWorks &&
                    editWorks.map((work, idx) =>
                        <InputWorkCard
                            key={idx}
                            work={work}
                            onChangeTitle={title => handleChangeWork(idx, { title })}
                            onChangeDetail={detail => handleChangeWork(idx, { detail })}
                            onChangeImage={image => handleChangeWork(idx, { image })}
                            onChangeLink={link => handleChangeWork(idx, { link })}
                            isFirst={idx === 0}
                            isLast={idx === editWorks.length - 1}
                            onMovePrev={() => handleExchange(idx, "prev")}
                            onMoveNext={() => handleExchange(idx, "next")}
                        />
                    )
                }
                <button
                    className={twMerge(
                        "btn btn-accent shadow fixed bottom-8 right-2 rounded-full",
                        isSaving && "btn-disabled"
                    )}
                    onClick={handleSave}
                    disabled={isSaving}
                >
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
    onMovePrev: () => void
    onMoveNext: () => void
    isFirst: boolean
    isLast: boolean
}
export const InputWorkCard: FC<InputWorkCardProps> = ({
    work,
    onChangeTitle, onChangeDetail, onChangeImage, onChangeLink,
    onMovePrev, onMoveNext, isFirst, isLast,
}) => {
    return (
        <WorkCard
            work={work}
            disableLink
            slots={{
                title: work => (
                    <input
                        className='input input-bordered '
                        placeholder='タイトル'
                        value={work.title}
                        onChange={e => onChangeTitle(e.target.value)}
                    />
                ),
                detail: work => (
                    <textarea
                        className='textarea textarea-bordered w-full my-1'
                        placeholder='説明'
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
                    <div className='w-full flex justify-between items-center flex-wrap-reverse'>
                        <div className='flex gap-1'>
                            <button className="btn" disabled={isFirst} onClick={onMovePrev}>
                                ↑
                            </button>
                            <button className="btn" disabled={isLast} onClick={onMoveNext}>
                                ↓
                            </button>
                        </div>
                        <div className='flex items-center flex-wrap'>
                            <span>
                                リンク
                            </span>
                            <input
                                type="text"
                                className="input input-bordered min-w-[50%]"
                                value={work.link}
                                onChange={e => onChangeLink(e.target.value)}
                            />
                        </div>
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
