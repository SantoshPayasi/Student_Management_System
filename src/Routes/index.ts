import express from "express"
import AdminRoutes from "./AdminRoutes"
import childrenRoutes from "./childrenRoutes"
const app = express()

const routes ={
    AdminRoutes,
    childrenRoutes
}
// const router = ()=>{
// app.use("admin", AdminRoutes)
// app.use("children", childrenRoutes)
// }
export default routes;