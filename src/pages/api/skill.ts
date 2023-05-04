import { getSkills } from "@/skill/server";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    res.json(await getSkills())
}
export default handler
