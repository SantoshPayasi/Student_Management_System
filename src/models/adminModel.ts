import mongoose from "mongoose";
import { Admin } from "../config/interfaces";
import { timeStamp } from "console";

const adminModel = new mongoose.Schema(
    {
        name:{
            type:String,
             required:false,
             default:"Admin User"
             
            },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
        childrenList:[
            {type: mongoose.Types.ObjectId, ref:"childrenSchema"},
        ],
        accessCode:{
                code:{
                  type:String,
                  required:true,
                  trim:true
                },
                updateDate:{
                    type:Date
                },
        }
    },
    {
        timestamps:true
    }
)

export default  mongoose.model<Admin>("adminSchema", adminModel)