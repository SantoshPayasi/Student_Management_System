import express from "express"
const Router = express.Router()
import adminController from "../controller/adminController"
// Testing for admin endPoint
Router.get("/", adminController.testing )
// EndPoint to create admin


export default Router
