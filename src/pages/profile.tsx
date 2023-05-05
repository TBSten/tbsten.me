import PageHead from '@/components/PageHead';
import Choice from '@/components/game/choice/Choice';
import Choices from '@/components/game/choice/Choices';
import BasicLayout from '@/components/layout/BasicLayout';
import LayoutContent from '@/components/layout/LayoutContent';
import PageTitle from '@/components/layout/PageTitle';
import { NextPage } from 'next';
import { FC } from 'react';

interface Props {
}
const ProfilePage: NextPage<Props> = ({ }) => {
    return (
        <>
            <ProfileHead />
            <BasicLayout>
                <PageTitle>
                    プロフィール
                </PageTitle>
                <LayoutContent>
                    <Choices>
                        <Choice>
                            技術記事書き大志
                        </Choice>
                        <Choice>
                            ツイ廃 気味
                        </Choice>
                    </Choices>
                </LayoutContent>
                <LayoutContent>
                    <div className="overflow-x-auto">
                        <table className='table w-full'>
                            <tbody>
                                <tr>
                                    <th>名前</th>
                                    <td>TBSten</td>
                                    <td>てべすてん と呼んでください</td>
                                </tr>
                                <tr>
                                    <th>好きな<wbr />技術分野</th>
                                    <td>Android, Web</td>
                                    <td>Androidエンジニア Lv 0.5 です。</td>
                                </tr>
                                <tr>
                                    <th rowSpan={2}>趣味</th>
                                    <td>プログラミング</td>
                                    <td>技術の勉強したり何かを作ったり.... 勉強会に参加したりもしたりしなかったり。</td>
                                </tr>
                                <tr>
                                    <td>音楽・歌詞考察</td>
                                    <td>
                                        J-POPを聴きます。
                                        「ずっと真夜中にいいのに。」が大好き。
                                        歌詞の考察も時々。
                                    </td>
                                </tr>
                                <tr>
                                    <th>好きな言葉</th>
                                    <td>「ぼーとして没頭して」</td>
                                    <td>真逆の意味の言葉で韻を踏むって最高かよ...</td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td>愛知県住み 愛知生まれ 愛知育ち</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>身長</th>
                                    <td>ちっちゃい</td>
                                    <td>
                                        <p>
                                            せめて160欲しい人生だった...
                                        </p>
                                        <p>
                                            毎年ちょっとずつ背が縮む
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </LayoutContent>
            </BasicLayout>
        </>
    );
}
export default ProfilePage;

interface ProfileHeadProps {
}
const ProfileHead: FC<ProfileHeadProps> = () => {
    return (
        <PageHead
            path='/pages'
            title='プロフィール | TBSten'
            description='TBStenのプロフィールページです。'
        />
    );
}
