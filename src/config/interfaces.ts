import mongoose, { Document } from "mongoose"

interface basicDetails {
    name:string,
    email:string,
    password:string
}

interface AccessCode{
    code: string,
    updateDate:Date
}
export interface Admin extends Document, basicDetails, AccessCode{
    basicDetails:basicDetails
    children:[mongoose.Types.ObjectId]
    accessCode:AccessCode
    _doc: object
}


export interface Children extends Document, basicDetails{
    basicDetails:basicDetails,
    department:string,
    tasks:[any]
    _doc:object
}

export interface Itask{
    task:string,
    iscompleted:boolean
    ispanding:boolean,
    isOverdue:boolean,
    assignedBY:mongoose.Types.ObjectId
}
