import { addMonolog } from "@/monolog/server";
import { NewMonologSchema } from "@/monolog/type";
import { apiRouteOf } from "@/server/apiRoute";

export default apiRouteOf({
    requireAuthPost: true,
    async onPost({ req, res, body, invalidBody }) {
        const input = NewMonologSchema.safeParse(body)
        if (!input.success) {
            return invalidBody(res)
        }
        const newMonolog = await addMonolog(input.data)
        res.json(newMonolog)
    },
})
