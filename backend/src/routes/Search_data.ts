import express from 'express'
import Contents from '../Database_Schema/contents'
import Users from '../Database_Schema/Users'
const Search_Router = express.Router();
import Authentication_token from '../middlewares/Auth_middleware';
import { error } from 'console';


Search_Router.get("/tweet" , Authentication_token , async(req,res)=>{
        
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


Search_Router.get("/videos" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"youtube"})

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



Search_Router.get("/notes" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"text"})

        if(result.length ===0){
            return res.status(204).json({
                message:"No Data present",
                result:result
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


Search_Router.get("/images" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"image"})

        if(result.length ===0){
            return res.status(204).json({
                message:"No Data present",
                result:result
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



Search_Router.get("/files" , Authentication_token , async(req,res)=>{
        
    try{
        
        //@ts-ignore
        const userID = req.user.user_id;
        const result = await Contents.find({userId:userID,type:"file"})

        if(result.length ===0){
            return res.status(204).json({
                message:"No Data present",
                result:result
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