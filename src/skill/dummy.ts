import { Skill } from "./type";

const assessmentMax = 4

export const dummySkills: Skill[] = [
    {
        icon: "/favicon.ico",
        name: "Android",
        tags: ["android"],
        assessment: 2,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/favicon.ico",
        name: "Jetpack Compose",
        tags: ["android"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/favicon.ico",
        name: "Kotlin",
        tags: ["android", "language", "jvm"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/favicon.ico",
        name: "Nextjs",
        tags: ["web", "web front", "javascript"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/favicon.ico",
        name: "React",
        tags: ["web", "web front", "javascript"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/favicon.ico",
        name: "TypeScript",
        tags: ["web", "javascript"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/favicon.ico",
        name: "Java",
        tags: ["web", "javascript"],
        assessment: 4,
        assessmentMax,
        interest: false,
    },
]
