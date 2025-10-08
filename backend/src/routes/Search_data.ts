import express from 'express'
import Contents from '../Database_Schema/contents'
import Users from '../Database_Schema/Users'
const Search_Router = express.Router();
import Authentication_token from '../middlewares/Auth_middleware';
import { error } from 'console';


Search_Router.get("/twitter" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"twitter"})

        if(result.length ===0){
            return res.status(400).json({
                message:"No Data present"
            })
        }

        return res.status(200).json({
            message:"Data Feteched Successfully..",
            result:result
        })

    }

    catch(er){

        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})


Search_Router.get("/video" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"video"})

        if(result.length ===0){
            return res.status(400).json({
                message:"No Data present"
            })
        }

        return res.status(200).json({
            message:"Data Feteched Successfully..",
            result:result
        })

    }

    catch(er){

        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})



Search_Router.get("/file" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"file"})

        if(result.length ===0){
            return res.status(400).json({
                message:"No Data present"
            })
        }

        return res.status(200).json({
            message:"Data Feteched Successfully..",
            result:result
        })

    }

    catch(er){

        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})


Search_Router.get("/note" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"note"})

        if(result.length ===0){
            return res.status(400).json({
                message:"No Data present"
            })
        }

        return res.status(200).json({
            message:"Data Feteched Successfully..",
            result:result
        })

    }

    catch(er){

        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })
    }
})






export default Search_Router;