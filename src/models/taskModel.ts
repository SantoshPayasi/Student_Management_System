import mongoose from "mongoose"

const taskModel = new mongoose.Schema(
    {
    task:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
         default:false
        },
    isPanding:{
        type:Boolean,
         default:true
        },
    isOverDue:{
        type:Boolean,
         default:true
        },
    assignedBy:{
        type:mongoose.Types.ObjectId,
        ref:"adminSchema"
    },
    dueDate:{
        type:Date,
        required:true
    }
 },
 {
    timestamps:true
 }
)



export default mongoose.model("taskSchema", taskModel)