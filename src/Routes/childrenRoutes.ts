import express from 'express'
const Router = express.Router()
import childrenController from '../controller/childrenController'
// Testing app 
Router.get("/", childrenController.testing)
// get all tasks
Router.post("/getAlltasks", childrenController.getAlltasks)
// Update Perticular task status
Router.get("/updateStatus/:studentId/:taskId", childrenController.updatePerticularTaskStatus)
export default Router