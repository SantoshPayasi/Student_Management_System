import express from "express"
import cron from 'node-cron'
import taskModel from "../models/taskModel"
export const updateTaskStatus =()=>{
    cron.schedule("0 */1 * * * *", ()=>{
       const currentDate = new Date()

       taskModel.updateMany({dueDate:{$lt: currentDate.toISOString()}, isCompleted:{$ne:true}},{$set:{isOverDue:true}}).then((data:any)=>{
        if(data){
            console.log(data)
        }
       }).catch(e=>{
        console.log(e)
       })
    })
}