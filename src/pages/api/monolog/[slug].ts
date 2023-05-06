import { apiRouteOf } from "@/server/apiRoute";


export default apiRouteOf({
    async onGet({ req, res }) {
    },
    requireAuthPut: true,
    async onPut({ req, res }) { },
    requireAuthDelete: true,
    async onDelete({ req, res }) { }
})
