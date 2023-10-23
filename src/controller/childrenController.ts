import express, {Request, Response, response} from 'express'


const childrenController = {
    testing:(req: Request, res:Response) =>{
        res.status(200).send("Children Endpoint is running fine move forward")
    }
}

export default childrenController