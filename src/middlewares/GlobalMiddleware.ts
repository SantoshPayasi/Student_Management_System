import {Request, Response, NextFunction} from "express"
import mongoose from "mongoose"
import childrenModel from "../models/childrenModel"
import Adminschema from "../models/adminModel"
export const emailValidator =(req:Request, res:Response, next:NextFunction)=>{
    const {email, password, name} = req.body
    if(email == null || password==null || name == null){
        return res.status(404).send({
            "message":"bad request"
        })
    }
    else{
        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if(emailRegex.test(email)){
            next()
        }
        else{
            return res.status(404).send({
                "message":"bad request please enter a valid email"
            })
        }
    }
}

export const isChilldExist = async(id:any) =>{
    const child = await childrenModel.findById({_id:id})
    if(child){
        return child
    }
    else{
        return null
    }

}

export const checkcodeisActive=async (code:string)=>{
    try {
        const admin = await Adminschema.findOne({"accessCode.code":code})
        if(admin){
        const date = admin.accessCode.updateDate
         const isvalidCode = (new Date().getTime()-new Date(date).getTime()) > (10*60*1000) ? false : true 
        //  console.log(new Date().getTime()-new Date(date).getTime())
        //  console.log(isvalidCode)
        return {isValidCode: isvalidCode , adminId:admin._id}
        }
        return "Invalid code"
    } catch (error:any) {
        return error
    }
}