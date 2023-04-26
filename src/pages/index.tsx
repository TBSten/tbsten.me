import TBStenImg from "@/../public/tbsten.png";
import { dummyArticles } from "@/article/dummy";
import { Article } from "@/article/type";
import Center from "@/components/Center";
import FadeScale, { FadeScaleProps } from "@/components/animation/FadeScale";
import Footer from "@/components/layout/Footer";
import LayoutContent, { LayoutContentProps } from "@/components/layout/LayoutContent";
import PopupMenu from "@/components/layout/PopupMenu";
import { dummySkills } from "@/skill/dummy";
import { Skill } from "@/skill/type";
import classNames from "classnames";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { BsStarFill } from "react-icons/bs";
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
        {/* <div className="p-1 sticky top-0 left-0 right-0"> */}
        <div className="p-1">
          <div className="p-0.5 rounded-lg">
            <h1 className="flex justify-center border-primary border-2 rounded-lg text-base-content bg-base-100">
              <Link href="/" className="text-center w-full h-full normal-case font-dot font-bold text-6xl sm:text-2xl z-30">
                TBSten
              </Link>
            </h1>
          </div>
        </div>

        <Hero />

        <ArticlesSection
          articles={dummyArticles}
        />

        <SkillsSection
          skills={dummySkills}
        />

        <Footer />

        <div className="sticky bottom-0 md:right-1 md:bottom-1 md:w-fit md:fixed ">
          <PopupMenu />
        </div>

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
            "rounded-3xl w-full h-auto sm:h-[50vh] sm:w-auto mt-8 border-4 border-primary hover:border-primary-focus",
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
              "my-1 sm:before:content-['▶︎_'] sm:before:text-primary delay-0",
            )}>
              プログラミング好きなしがない
              専門学生
            </div>
            <div className="my-1 sm:before:content-['▶︎_'] sm:before:text-primary delay-100">
              Android エンジニア
              {" "}
              Lv 0.5
            </div>
            <div className="my-1 sm:before:content-['▶︎_'] sm:before:text-primary delay-200">
              技術記事 書き大志
            </div>
            <div className="my-1 sm:before:content-['▶︎_'] sm:before:text-primary delay-300">
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

interface SectionProps extends LayoutContentProps {
  bg?: string
  // disableMargin?: boolean
  m?: string
  stickTo?: "left" | "right"
  fadeScaleProps?: FadeScaleProps
  children?: ReactNode
}
const Section: FC<SectionProps> = ({
  bg,
  m,
  stickTo = "right",
  className,
  children,
  fadeScaleProps = {},
  ...props
}) => {
  return (
    <FadeScale {...fadeScaleProps}>
      <LayoutContent className={classNames(
        "relative ",
        bg ?? "bg-base-100 bg-opacity-95",
        m ?? "my-8",
        { "mr-2 sm:mr-4 md:mr-8": stickTo === "left" },
        { "ml-2 sm:ml-4 md:ml-8": stickTo === "right" },
        className,
      )}  {...props}>
        {children}
      </LayoutContent>
    </FadeScale>
  );
}

interface ArticlesSectionProps {
  articles: Article[]
}
const ArticlesSection: FC<ArticlesSectionProps> = ({ articles }) => {
  return (
    <Section id="articles" bg="" className="font-dot" fadeScaleProps={{ scaleSize: "y" }}>
      <div className="bg-base-100 absolute right-0 top-0 w-full md:w-[66%] h-full -z-30 " />
      <h2 className="m-0 mb-6 text-base-content md:text-white">
        ▶︎ 記事
      </h2>
      <div className="w-full flex flex-nowrap flex-row gap-4 items-center overflow-x-auto px-4">
        {articles.map(article =>
          <Link href={article.link} className={classNames(
            "w-52 bg-base-100 rounded-xl overflow-hidden flex-shrink-0 flex-grow-0 my-4 shadow",
            "transition-transform duration-500 hover:scale-110 cursor-pointer",
          )} key={article.link}>
            <Image
              className="w-full"
              src={article.ogImage}
              alt={article.title}
              width={208}
              height={160}
            />
            <div className="font-main px-2 py-1">
              {article.title.substring(0, 25)}
              {article.title.length >= 25 && "..."}
            </div>
          </Link>
        )}
        <div className="w-52 text-center flex-shrink-0 flex-grow-0">
          <a href="/articles" className="min-w-fit btn btn-ghost mx-2 overscroll-contain">
            ▶︎ MORE ▶︎
          </a>
        </div>
      </div>
      {/* TODO ジャンル別リンク (Zenn,Qiitaなど) */}
    </Section>
  );
}
interface SkillsSectionProps {
  skills: Skill[]
}
const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <Section id="skills" stickTo="left" fadeScaleProps={{ scaleSize: "x" }}>
      <h2 className="font-dot mt-2 mb-6">
        ▶︎ スキル
      </h2>
      <div className="flex gap-1 flex-wrap">
        {skills.map(skill =>
          <div key={skill.name} className={classNames(
            skill.interest ? "border-primary " : "border-secondary",
            "rounded overflow-hidden border flex flex-row items-center flex-nowrap",
          )}>
            <div className={classNames(
              skill.interest ? "bg-primary text-primary-content " : "bg-secondary text-secondary-content ",
              "flex flex-row items-center px-1",
            )}>
              <Image
                className="w-4 h-4 inline-block rounded-sm mr-0.5"
                src={skill.icon}
                alt={skill.name}
                width={20}
                height={20}
              />
              {skill.name}
            </div>
            <div className={classNames(
              skill.interest ? "bg-primary-content text-primary " : "bg-secondary-content text-secondary",
              "h-full inline-flex flex-nowrap justify-center items-center px-0.5",
            )}>
              <BsStarFill className="inline-block bg-transparent" />
              {"×"}
              {skill.assessment}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

