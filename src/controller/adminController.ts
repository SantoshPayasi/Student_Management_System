import express, {Request, Response} from "express"


const adminController = {
    testing:(req:Request, res:Response)=>{
        console.log("It is working")
        res.status(200).send(
            {
            "message":"Api endpoint is working fine"
            }
          )
    }
}

export default adminController