import { NextFunction , Request , Response } from "express";
import dotenv from 'dotenv'
import jwt,{JwtPayload} from 'jsonwebtoken'
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET_KEY

if(!JWT_SECRET){
    console.log("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}
export const Auth_Middleware = (req:Request,res:Response,next:NextFunction)=>{
    
    const token = req.cookies?.token;

   
        if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token found"
    });
  }
   

   try{
    


    const decoded = jwt.verify(token as string , JWT_SECRET);
    //@ts-ignore
     if (!decoded.user_id) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }

    if(decoded){

    //@ts-ignore
    req.user = decoded as string | JwtPayload
    }


   }

   catch(er){
    return res.status(403).json({
        message:"Invalid or Expired Token",
        error:er
    })
   }

    
    
   

}