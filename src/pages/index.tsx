import TBStenDeadImg from "@/../public/tbsten-2.png";
import TBStenImg from "@/../public/tbsten500x500.png";
import { useDelayedValue } from "@/client/delayed";
import Dialog, { useDialog } from "@/components/Dialog";
import MarkdownText from "@/components/MarkdownText";
import PageHead from "@/components/PageHead";
import CommandButton from "@/components/game/CommandButton";
import GameBox from "@/components/game/GameBox";
import TypingText from "@/components/game/TypingText";
import Choice from "@/components/game/choice/Choice";
import Choices from "@/components/game/choice/Choices";
import { useHp } from "@/components/game/useHp";
import GithubIcon from "@/components/icon/GithubIcon";
import QiitaIcon from "@/components/icon/QiitaIcon";
import TwitterIcon from "@/components/icon/TwitterIcon";
import ZennIcon from "@/components/icon/ZennIcon";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import PopupMenu from "@/components/layout/PopupMenu";
import { useHelloEffect } from "@/components/useHelloEffect";
import { useRandomMonolog } from "@/monolog/client";
import classNames from "classnames";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { AiFillMessage, AiFillStar } from "react-icons/ai";
import { BiDoorOpen } from "react-icons/bi";
import styles from "./index.module.scss";

interface Props {
}

const Top: NextPage<Props> = () => {
  useHelloEffect()
  return (
    <>
      <TopHead />
      <div className="w-full h-full relative scroll-smooth scroll-p-10">
        <Image
          className="w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-50 blur-md object-cover overflow-visible brightness-90 bg-base-300"
          src={TBStenImg}
          alt="TBSten icon"
          width={500}
          height={500}
          priority={false}
          quality={20}
          placeholder="blur"
        />

        <h1 className="w-full flex justify-center text-center my-2">
          <Link href="/" className="btn btn-primary btn-wide btn-outline text-3xl">
            TBSten
          </Link>
        </h1>

        <Hero />

        <Footer />

        <PopupMenu />

      </div>
    </>
  )

}

export default Top

interface TopHeadProps {
}
const TopHead: FC<TopHeadProps> = () => {
  return (
    <PageHead
      path="/"
      title="TBSten"
      description="プログラミング好きなしがない専門学校生TBStenのポートフォリオサイトです。"
    />
  );
}


const SECRET_LINK = "/secret"

interface HeroProps {
}
const Hero: FC<HeroProps> = () => {
  const { hp, maxHp, attack, knocked } = useHp({
    onKnock() {
      knockedDialog.show()
    }
  })

  const router = useRouter()
  const [hittingDamage, setHittingDamage] = useState<null | { damage: number }>(null)
  const handleCommand = useCallback(({ goto: href, damage = 10 }: { goto: string, damage?: number }) => async () => {
    if (hittingDamage) return
    setHittingDamage({ damage })
    if (hp > 0) {
      // 攻撃
      const newHp = await attack(damage)
      // ページ移動
      if (newHp <= 0) return
      setTimeout(() => {
        router.push(href)
      }, 600)
    } else {
      router.push(href)
    }
  }, [hittingDamage, hp, attack, router])

  const handleMagicCommand = useCallback(async () => {
    if (hittingDamage) return
    // 攻撃
    const damage = 100
    setHittingDamage({ damage })
    await attack(damage)
    // フィーバーモード終了
    setIsFeverMode(false)
  }, [hittingDamage, attack])

  const [isFeverMode, setIsFeverMode] = useState(false)
  useEffect(() => {
    if (Math.random() <= 0.2) setIsFeverMode(true)
  }, [])

  const knockedDialog = useDialog()

  const [isLoadedImage, setIsLooadedImage] = useState(false)
  const delayedIsLoadImage = useDelayedValue(500, isLoadedImage)

  const { isLoading: isLoadingRandomMonolog, monolog: randomMonolog } = useRandomMonolog()
  return (
    <div className="my-8 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-8 mt-[150px] my-8">
        <div className="relative">
          <div className={classNames(
            "absolute bottom-[calc(100%+0.5rem)] left-[-1.5rem] right-[-1.5rem] w-[calc(100%+1.5rem*2)] h-[150px]",
            "md:left-[-3rem] md:right-[-3rem] md:w-[calc(100%+3rem*2)]",
            "bg-base-100 cursor-pointer p-2 rounded-xl hover:rounded-2xl overflow-visible hover:shadow-2xl",
            "active:scale-90",
            styles["balloon"],
            "delay-700 duration-300", isLoadingRandomMonolog ? "opacity-0 translate-y-12" : "opacity-100 translate-y-0",
          )} onClick={handleCommand({ goto: `/monolog#${randomMonolog?.slug}`, damage: 10 })}>
            <div className="overflow-auto w-full h-full">
              <div className="font-bold font-dot text-center">独り言</div>
              {randomMonolog &&
                <MarkdownText
                  markdown={randomMonolog.content}
                  compact
                />
              }
              <div className="absolute bottom-1 right-1 px-0.5 link link-primary bg-white rounded">
                詳しく
              </div>
            </div>
          </div>
          <Image
            className={classNames(
              "w-full h-auto max-h-[60vh] object-contain md:h-64 md:w-auto rounded-md",
              {
                [styles["animate-icon"]]: hittingDamage !== null,
                "opacity-50": knocked,
              },
            )}
            src={knocked ? TBStenDeadImg : TBStenImg}
            alt="TBStenのアイコン"
            width={500}
            height={500}
            onAnimationEnd={() => setHittingDamage(null)}
            priority={false}
            onLoad={() => setIsLooadedImage(true)}
          />
          <div className="absolute -bottom-6 left-0 right-0 w-full px-4" >
            <HeroHpGage
              hp={hp}
              maxHp={maxHp}
            />
            <HeroDamageEffect
              className="absolute bottom-0 right-2 z-50"
              damage={hittingDamage?.damage ?? null}
            />
          </div>
        </div>
        <div className="">
          <h2 className="font-dot text-5xl text-white text-center my-2">
            <div className={classNames(
              "duration-500",
              delayedIsLoadImage ? "opacity-100" : "opacity-0",
            )}>
              <TypingText key={String(delayedIsLoadImage)}>
                TBSten
              </TypingText>
            </div>
          </h2>
          <Choices containerClassName="font-main text-sm">
            <Choice>
              プログラミング好きな
              しがない
              <span className="font-dot">
                専門学生
              </span>
            </Choice>
            <Choice>
              <span className="font-dot">
                Androidエンジニア
              </span>
              {" "}
              Lv 0.5
            </Choice>
            <Choice>
              <span className="font-dot">
                技術記事
              </span>
              書き大志
            </Choice>
            <Choice>
              {"'"}TBSten{"'"}
              と書いて
              <span className="font-dot">
                てべすてん
              </span>
              と読みます
            </Choice>
          </Choices>
        </div>
      </div>
      <Container>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 px-8 md:px-0 gap-2">
          <CommandButton key="prof"
            startIcon={
              <>😁</>
            }
            onClick={handleCommand({ damage: 10, goto: "/profile" })}
          >
            プロフィールを見る
          </CommandButton>
          <CommandButton key="zenn"
            startIcon={
              <ZennIcon />
            }
            onClick={handleCommand({ damage: 30, goto: "https://zenn.dev/tbsten" })}
          >
            Zenn
            の記事を見る
          </CommandButton>
          <CommandButton key="qiita"
            startIcon={
              <QiitaIcon />
            }
            onClick={handleCommand({ damage: 30, goto: "https://qiita.com/tbsten" })}
          >
            Qiita
            の記事を見る
          </CommandButton>
          <CommandButton key="skill"
            startIcon={
              <AiFillStar className="text-yellow-400" />
            }
            onClick={handleCommand({ goto: "/skills" })}
          >
            スキルを見る
          </CommandButton>
          <CommandButton key="work"
            startIcon={
              "🛠️"
            }
            onClick={handleCommand({ goto: "/works" })}
          >
            作ったものを見る
          </CommandButton>
          <CommandButton key="work"
            startIcon={
              "😍"
            }
            onClick={handleCommand({ goto: "/likes" })}
          >
            好きなものを見る
          </CommandButton>
          <CommandButton key="monolog"
            startIcon={
              <AiFillMessage />
            }
            onClick={handleCommand({ goto: "/monolog", damage: 20 })}
          >
            独り言を聞く
          </CommandButton>
          <CommandButton key="github"
            startIcon={
              <GithubIcon />
            }
            onClick={handleCommand({ goto: "https://github.com/tbsten" })}
          >
            Github
            を見る
          </CommandButton>
          <CommandButton key="twitter"
            startIcon={
              <TwitterIcon />
            }
            onClick={handleCommand({ goto: "https://twitter.com/tbs__ten" })}
          >
            Twitter
            を見る
          </CommandButton>
          {isFeverMode &&
            <CommandButton key="magic"
              startIcon={
                "🪄"
              }
              onClick={handleMagicCommand}
            >
              呪文を唱える
            </CommandButton>
          }
          {knocked &&
            <Link href={SECRET_LINK} key="secret" className="w-full">
              <CommandButton
                className="w-full"
                color="secondary"
                variant="contained"
                startIcon={
                  <BiDoorOpen />
                }
              >
                ひみつの抜け道
              </CommandButton>
            </Link>
          }
        </div>
      </Container>
      <Dialog {...knockedDialog.dialogProps}>
        <div className="text-xl font-bold">
          Good !
        </div>
        <GameBox containerClassName="my-4">
          <p>
            TBStenを倒した！
          </p>
          <p>
            ひみつの抜け道を見つけた！
          </p>
        </GameBox>
        <div className="flex flex-col-reverse gap-1 md:flex-row md:justify-between items-end">
          <div>
            <button className="btn" onClick={knockedDialog.hide}>戻る</button>
          </div>
          <div>
            <Link href={SECRET_LINK} className="btn btn-secondary">
              ひみつの抜け道へ
            </Link>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

interface HeroHpGageProps {
  hp: number
  maxHp: number
}
const HeroHpGage: FC<HeroHpGageProps> = ({ hp, maxHp }) => {
  return (
    <div className="relative ">
      {/* gage */}
      <div className="h-3 w-full bg-gray-800 overflow-hidden rounded-full relative">
        <div className="absolute left-0 h-full bg-primary transition-all duration-700" style={{
          width: `${hp / maxHp * 100}%`,
        }} />
      </div>
      {/* hp text */}
      <div className="absolute right-2 bottom-0 z-10 font-dot text ">
        <span className="text-3xl text-slate-200 bg-clip-text font-bold">
          {hp}
        </span>
        <span className="text-xl text-slate-200">
          /{maxHp}
        </span>
      </div>
    </div>
  );
}

interface HeroDamageEffectProps {
  className?: string
  damage: number | null
}
const HeroDamageEffect: FC<HeroDamageEffectProps> = ({ damage, className }) => {
  const [currentDamage, setCurrentDamage] = useState(damage)
  useEffect(() => {
    if (damage !== null) setCurrentDamage(damage)
  }, [damage])
  return (
    <div key={damage} className={classNames(
      "text-red-600 text-[2em] font-dot",
      className,
    )}>
      {damage !== null &&
        <motion.div
          animate={{
            opacity: [1, 1, 0],
            y: [0, -10],
          }}
          transition={{ duration: 0.7 }}
        >
          -{currentDamage}
        </motion.div>
      }
    </div>
  );
}

