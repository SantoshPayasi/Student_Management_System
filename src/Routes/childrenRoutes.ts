import express from 'express'
const Router = express.Router()
import childrenController from '../controller/childrenController'
// Testing app 
Router.get("/", childrenController.testing)
export default Router