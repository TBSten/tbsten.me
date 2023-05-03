import TBStenImg from "@/../public/tbsten.png";
import Center from "@/components/Center";
import Footer from "@/components/layout/Footer";
import PopupMenu from "@/components/layout/PopupMenu";
import classNames from "classnames";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "./index.module.scss";

interface Props {
}

const Top: NextPage<Props> = () => {
  return (
    <>
      <TopHead />
      <div className="w-full h-full relative scroll-smooth scroll-p-10">
        <Image
          className="w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-50 blur-md object-cover overflow-visible brightness-90 "
          src={TBStenImg}
          alt="TBSten icon"
          width={500}
          height={500}
        />

        {/* header */}
        {/* <div className="p-1">
          <div className="p-0.5 rounded-lg">
            <h1 className="flex justify-center border-primary border-2 rounded-lg text-base-content bg-base-100">
              <Link href="/" className="text-center w-full h-full normal-case font-dot font-bold text-6xl sm:text-2xl">
                TBSten
              </Link>
            </h1>
          </div>
        </div> */}
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
    <Head>
      <title>
        TBSten
      </title>
    </Head>
  );
}

interface HeroProps {
}
const Hero: FC<HeroProps> = () => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:my-32 px-8 py-2">
      <Link href="/">
        <Image
          className={classNames(
            "rounded-3xl w-full h-auto sm:h-[50vh] sm:w-auto mt-8 border-4 border-primary-content",
            styles["animate-icon"]
          )}
          src={TBStenImg}
          alt="TBSten icon"
          width={500}
          height={500}
        />
      </Link>
      <div className="mx-2 sm:mx-4 w-full sm:max-w-[50%] font-dot text-white text-2xl sm:text-xl text-center sm:text-start">
        <Center className={classNames(
          "text-4xl my-8",
        )}>
          TBSten
        </Center>
        <div className="my-2 bg-base-100 text-base-content p-2 rounded-md w-full sm:min-w-[30vw] text-base relative">
          <div className="absolute top-0 left-0 z-0 w-full h-full p-1">
            <div className="w-full h-full border-2 border-primary rounded" />
          </div>
          <div className="relative">
            <div className={classNames(
              "my-1 sm:before:content-['▶︎'] sm:before:mx-2 sm:before:text-primary delay-0",
            )}>
              プログラミング好きなしがない
              専門学生
            </div>
            <div className="my-1 sm:before:content-['▶︎'] sm:before:mx-2 sm:before:text-primary delay-100">
              Android エンジニア
              {" "}
              Lv 0.5
            </div>
            <div className="my-1 sm:before:content-['▶︎'] sm:before:mx-2 sm:before:text-primary delay-200">
              技術記事 書き大志
            </div>
            <div className="my-1 sm:before:content-['▶︎'] sm:before:mx-2 sm:before:text-primary delay-300">
              挙動が IPAのファン
            </div>
          </div>
        </div>
        <Center>
          <Link href="/profile" className="btn btn-sm my-2">
            ▶︎ もっと ◀︎
          </Link>
        </Center>
      </div>
    </div>
  );
}
