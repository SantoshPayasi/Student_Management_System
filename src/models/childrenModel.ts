import mongoose from "mongoose";
import { Children } from "../config/interfaces";

const childrenModel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        department:{
           type:String,
           required:true,
        },
        tasks:[
            {type:mongoose.Types.ObjectId, ref:"taskSchema"}
        ]
    },
    {
        timestamps:true
    }
)

export default mongoose.model<Children>("childrenSchema", childrenModel)