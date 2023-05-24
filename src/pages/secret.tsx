import Center from '@/components/Center';
import GithubIcon from '@/components/icon/GithubIcon';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { logPageAccess } from '@/secret/server';
import { ssrOf } from '@/server/ssr';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface Props {
}
const SecretPage: NextPage<Props> = (props) => {
    return (
        <>
            <Head>
                <title>秘密の抜け道のその先 | TBSten</title>
            </Head>

            <BasicLayout>
                {/* content */}
                <PageTitle>
                    ポートフォリオサイト作成の裏側
                </PageTitle>
                <div className='text-center'>
                    <LayoutContent>
                        <div>
                            このポートフォリオサイトは以下のような技術スタックで開発しました！
                        </div>

                        <Center className='my-4 '>
                            <div className="border-2 border-primary-focus text-base-content bg-base-100 shadow p-2 md:p-4 rounded-lg w-fit">
                                <div className="font-bold text-xl md:text-3xl flex flex-col">
                                    <div className='text-primary'>
                                        <Link href="https://www.typescriptlang.org/" target='_blank' className='link'>
                                            TypeScript
                                        </Link>
                                        {" × "}
                                        <Link href="https://nextjs.org/" target='_blank' className='link'>
                                            Nextjs
                                        </Link>
                                        {" × "}
                                        <Link href="https://www.docker.com/" target='_blank' className='link'>
                                            Docker
                                        </Link>
                                    </div>
                                    <div className='text-base'>
                                        で開発
                                    </div>
                                </div>
                                <div className="font-bold text-xl md:text-3xl flex flex-col">
                                    <div className='text-primary'>
                                        <Link href="https://tailwindcss.com/" target='_blank' className='link'>
                                            Tailwind CSS
                                        </Link>
                                        {" × "}
                                        <Link href="https://daisyui.com/" target='_blank' className='link'>
                                            daisyui
                                        </Link>
                                    </div>
                                    <div className='text-base'>
                                        でスタイリング
                                    </div>
                                </div>
                                <div className='divider'>
                                    ↓↓↓
                                </div>
                                <div className='font-bold text-xl md:text-3xl flex flex-col my-1'>
                                    <div className='text-secondary'>
                                        <Link href="https://cloud.google.com/run" target='_blank' className='link'>
                                            Cloud Run
                                        </Link>
                                    </div>
                                    <div className='text-base'>
                                        にデプロイ
                                    </div>
                                </div>
                                <div className='font-bold text-xl md:text-3xl flex flex-col my-1'>
                                    <div className='text-secondary'>
                                        <Link href="https://cloud.google.com/firestore" target='_blank' className='link'>
                                            Cloud Firestore
                                        </Link>
                                        ・
                                        <Link href="https://cloud.google.com/storage" target='_blank' className='link'>
                                            Storage
                                        </Link>
                                    </div>
                                    <div className='text-base'>
                                        でデータの永続化
                                    </div>
                                </div>
                                <div className='font-bold text-xl md:text-3xl flex flex-col my-1'>
                                    <div className='text-secondary'>
                                        <Link href="https://www.cloudflare.com/ja-jp/" target='_blank' className='link'>
                                            Cloudflare
                                        </Link>
                                    </div>
                                    <div className='text-base'>
                                        でCDNにキャッシュ
                                    </div>
                                </div>
                                <div className='divider'>
                                    ↓ ↑
                                </div>
                                <div className='font-bold text-xl md:text-3xl flex flex-col my-1'>
                                    <div className='text-accent'>
                                        <Link href="https://github.com/" target='_blank' className='link'>
                                            Git/Github
                                        </Link>
                                    </div>
                                    <div className='text-base'>
                                        によるソースコード管理
                                    </div>
                                </div>
                                <div className='font-bold text-xl md:text-3xl flex flex-col my-1'>
                                    <div className='text-accent'>
                                        <Link href="https://cloud.google.com/build" target='_blank' className='link'>
                                            Cloud Build
                                        </Link>
                                    </div>
                                    <div className='text-base'>
                                        によるCI/CD
                                    </div>
                                </div>
                                {/* Tech Icons */}
                            </div>
                        </Center>
                        <div className="">
                            詳しいソースコードは以下のGithubリポジトリを参照してください！
                        </div>
                        <div className="my-2">
                            <Link href="https://github.com/TBSten/tbsten.me" target='_blank' className='btn btn-wide my-2'>
                                <GithubIcon className='m-2 text-xl' />
                                Githubリポジトリへ
                            </Link>
                        </div>
                    </LayoutContent>

                    <LayoutContent>
                        <Center className='my-4 '>
                            <div className="border-2 border-secondary-focus text-base-content bg-base-100 shadow p-2 md:p-4 rounded-lg w-fit">
                                <ul className='md:text-xl'>
                                    <li className="my-2">
                                        8bit風なフォントを使ったり、トップページにミニゲームを用意することで、
                                        <span className="font-bold">ファミコン時代のゲーム</span>
                                        をコンセプトにしています。
                                    </li>
                                    <div className="divider" />
                                    <li className='my-2'>
                                        トップページのミニゲームはコマンドごとにダメージが若干違います。
                                    </li>
                                    <li className='my-2'>
                                        トップページに時々現れる
                                        <span className='font-bold'>「呪文を唱える」コマンド</span>は
                                        大きなダメージを与えることができます！
                                    </li>
                                </ul>
                            </div>
                        </Center>
                    </LayoutContent>

                </div>

            </BasicLayout>

        </>
    );
}
export default SecretPage;

export const getServerSideProps: GetServerSideProps<Props> = ssrOf({
    hanlder: async ({ req }) => {
        await logPageAccess({
            path: "/secret",
            ip: req.socket.remoteAddress ?? null,
            accessAt: new Date().toUTCString(),
        })
        return { props: {} }
    }
})
