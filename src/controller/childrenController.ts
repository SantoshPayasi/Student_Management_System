import express, { Request, Response } from "express";
import mongoose from "mongoose";
import childrenModel from "../models/childrenModel";
import taskModel from "../models/taskModel";
import { isChilldExist } from "../middlewares/GlobalMiddleware";

const childrenController = {
  testing: (req: Request, res: Response) => {
    res.status(200).send("Children Endpoint is running fine move forward");
  },
  getAlltasks: async (req: Request, res: Response) => {
    try {
      const { _id } = req.body;
      const isValidObjectId: boolean = mongoose.isValidObjectId(_id);
      if (isValidObjectId) {
        let childDetails: any = await childrenModel
          .findById({ _id })
          .populate({
            path: "tasks",
          })
          .select("-password");

        if (childDetails) {
          return res.status(200).send({
            msg: "Tasks are fetched successfully",
            data: childDetails,
          });
        } else {
          return res.status(404).send({
            msg: "Unable to fetch details please check criedentials",
          });
        }
      } else {
        return res.status(404).send({
          msg: "Invalid id please check",
        });
      }
    } catch (error:any) {
        return res.status(404).send({
            msg: "Something went wrong invalid data",
            err:error.message
          });
    }
  },
  updatePerticularTaskStatus:async(req:Request, res:Response)=>{
    const {taskId, studentId} = req.params
    try {
        if(taskId && studentId && mongoose.isValidObjectId(studentId) && mongoose.isValidObjectId(taskId)){
              const child = await isChilldExist(studentId)
              if(child){
                const isTaskContains = child.tasks.includes(taskId)
                if(isTaskContains){
                    taskModel.findByIdAndUpdate({_id:taskId}, {isCompleted:true, isPanding:false, isOverDue:false})
                    .then(data=>{
                        if(data){
                            res.status(200).send(
                                {
                                    msg: "status is updated successfully"
                                }
                            )
                        }
                    })
                }
                else{
                    return res.status(400).send(
                        {
                            "msg":"Invvalid access task is not assigned to you"
                        }
                    )
                }
              }
              else{
               return  res.status(404).send(
                    {
                        msg:"Child does not exist you invalid id"
                    }
                )
              }
        }
        else{
           return res.status(400).send({
            "msg":"Bad request please send valid cridentials"
           })
        }
    } catch (error:any) {
        return res.status(400).send({
            "msg":"Bad request",
            err:error.message
           })
    }
  }
};

export default childrenController;
