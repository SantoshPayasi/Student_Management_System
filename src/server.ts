import express, { urlencoded , Request, Response}  from "express";
import dotenv from "dotenv"
import cors from "cors"
import { updateTaskStatus } from "./config/TaskStatusCheckCronJob";
const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))

import routes from "./Routes";

// DB configuration
import "./config/db"

// Schedule cron job

updateTaskStatus()


// Middleware to set routes
app.get("/", (req:Request, res:Response)=>{
  res.status(200).send({
    "msg":"routing is working fine"
  })
})
app.use("/admin" , routes.AdminRoutes)
app.use("/children", routes.childrenRoutes)
// app.use("/", router)

// Server initilization
const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`)
})


