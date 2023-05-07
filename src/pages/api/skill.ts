import { apiRouteOf } from "@/server/apiRoute";
import { getSkills, saveSkills } from "@/skill/server";
import { SkillSchema } from "@/skill/type";

export default apiRouteOf({
    async onGet({ req, res }) {
        res.json(await getSkills())
    },
    requireAuthPut: true,
    async onPut({ req, res, invalidBody }) {
        const input = SkillSchema.array().safeParse(
            JSON.parse(req.body)
        )
        if (!input.success) return invalidBody(res, String(input.error))
        await saveSkills(input.data)
        return res.json({ msg: "ok" })
    },
})
