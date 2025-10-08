import express from 'express'
import Contents from '../Database_Schema/contents'
const Contents_Router = express.Router();
import Authentication_token from '../middlewares/Auth_middleware';
import Links from '../Database_Schema/Links';
import { random } from './utils';
import { appendFile, link } from 'fs';
import Users from '../Database_Schema/Users';

interface Values{
    title:string;
    link:string;
    type:string;
    description:string;
    userId:string;
}
Contents_Router.get("/content" , Authentication_token , async(req,res)=>{
        
    try{
         
        //@ts-ignore
        const userId = req.user.user_id;


        const content_data = await Contents.find({
            userId:userId
        }).populate("userId","username")

        if(content_data.length ===0){
            return res.status(403).json({
                message:"Contents are Empty...",
                ok:false,
            })
        }

        return res.status(200).json({
            message:"Data Feteched Successfully...",
            ok:true,
            result:content_data
        })

        
    }
    catch(er){
         return res.status(500).json({
            message:"Internal Server Error",
            ok:false
         })
    }
})

Contents_Router.post("/content" , Authentication_token , async(req,res)=>{
      
    
   try{

   
         
         const title = req.body.title
         const link = req.body.link;
         const type = req.body.type;
         const description = req.body.description;
         //@ts-ignore
         const userId = req.user.user_id;

         const content :Values ={
            title:"",
            description:"",
            link:"",
            type:"",
            userId:"",
         }
            if(title) content.title=title;
            if(link) content.link=link;
            if(type) content.type=type;
            if(description) content.description=description;
            content.userId=userId;

         await Contents.create({
            content


         })

         return res.status(200).json({
            ok:true,
            message:"Content Added"
         })

   }
   catch(er){
    return res.status(500).json({
        message:"Internal Server Error",
        error:er
    })
   }



})

Contents_Router.delete("/delete_content" , async(req,res)=>{
       
    try{

        const content_id = req.body.contentId;

        await Contents.deleteMany({
            content_id,
            //@ts-ignore
            userId:req.user.user_id

        })

        return res.status(200).json({
            message:"Content Deleted Successfully..",
            ok:true
        })



    }
    catch(er){
         
        return res.status(500).json({
            message:"Internal Server Error..",
            error:er,
            ok:false
        })
    }
})

Contents_Router.post("/share"  , Authentication_token,async(req,res)=>{
      
    try{
        
         //@ts-ignore
        const userId = req.user.user_id;

        const share = req.body.share;

        if(share){
            
             //@ts-ignore
            const existing_link = await Links.findOne({userId : req.user.userId});
            
            if(existing_link){
                 return res.json({
                    message:"Link Already Generated",
                    link : existing_link.hash
                 })
            }
            const hash = random(10);
             await Links.create({
                userID:userId,
                hash :hash
             })

               return res.status(200).json({
             message : "Updated Sharable Link",
             link : "/share" + hash

             
        })
        }
        else{
             
            await Links.deleteOne({
                //@ts-ignore

                userId:req.user.user_id
            })

              return res.status(200).json({
             message : "Removed Sharable Link"
        })
        }

      



    }
    catch(er){

        return res.status(500).json({
             message:"Internal Server Error",
             ok:false,
             error:er
        })
         
    }
})

Contents_Router.get("/:shareLink" , async(req,res)=>{
     
    try{

        const hash = req.params.shareLink;

       const Link =  await Links.findOne({
            hash:hash
        })

        if(!Link){
             return res.status(411).json({
                message:"Sorry incorrect input.."
             })
        }

        const content = await Contents.find({
            userId:Link.userId
        })

        const user = await Users.find({
            _id : Link.userId
        })

        return res.status(200).json({
            username:user,
            content:content 
        })

    }
    catch(er){
        return res.status(500).json({
             message:"Internal Server Error",
             ok:false,
             error:er
        })
    }
})

export default Contents_Router;