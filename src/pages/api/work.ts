import { getWorks } from "@/work/server"
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
    res.json(await getWorks())
}

export default handler
