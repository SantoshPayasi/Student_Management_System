import express from "express"
const Router = express.Router()
import adminController from "../controller/adminController"
import {emailValidator} from "../middlewares/GlobalMiddleware"
// Testing for admin endPoint
Router.get("/", adminController.testing )
// EndPoint to create admin

Router.post("/createAdmin", emailValidator, adminController.createAdmin)

// Endpoint to get all admins
Router.get("/getAlladminsdetail", adminController.getAlladmins)

// Add children in database

Router.post("/addChildren/:adminId", emailValidator, adminController.addchildren)

// Add task to the children

Router.post("/addTask/:studentId/:accessCode", adminController.addTask)
export default Router
