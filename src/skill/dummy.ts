import { Skill } from "./type";

const assessmentMax = 4

export const dummySkills: Skill[] = [
    {
        icon: "/skill.png",
        name: "Android",
        tags: ["android"],
        assessment: 2,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/skill.png",
        name: "Jetpack Compose",
        tags: ["android"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/skill.png",
        name: "Kotlin",
        tags: ["android", "language", "jvm"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/skill.png",
        name: "Nextjs",
        tags: ["web", "web front", "javascript"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/skill.png",
        name: "React",
        tags: ["web", "web front", "javascript"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/skill.png",
        name: "TypeScript",
        tags: ["web", "javascript"],
        assessment: 3,
        assessmentMax,
        interest: true,
    },
    {
        icon: "/skill.png",
        name: "Java",
        tags: ["web", "javascript"],
        assessment: 4,
        assessmentMax,
        interest: false,
    },
]
