import express from 'express'
import Contents from '../Database_Schema/contents'
const Contents_Router = express.Router();
import Authentication_token from '../middlewares/Auth_middleware';
import Links from '../Database_Schema/Links';
import { random } from './utils';
import { appendFile, link } from 'fs';
import Users from '../Database_Schema/Users';
import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { console } from 'inspector';
import multer from 'multer';
import path from "path"
import fs from "fs";


const uploadDir = path.join(process.cwd(), "uploads");

// ✅ Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,uploadDir);
    },

    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,file.fieldname+'-'+uniqueSuffix+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});


interface Values{
    title:string;
    link:string;
    type:string;
    description:string;
    userId:string;
    image:string|null;
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
Contents_Router.post(
  '/content',
  upload.single('image'),
  Authentication_token,
  async (req, res) => {
    try {
      const { title, link, type, description } = req.body;
      const userId = (req as any).user?.user_id;

      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const data: Partial<Values> = {
        ...(title && { title }),
        ...(link && { link }),
        ...(type && { type }),
        ...(description && { description }),
        ...(imagePath && { image: imagePath }),
        ...(userId && { userId }),
      };

      console.log("New content data:", data);

      const createdContent = await Contents.create(data);

      return res.status(201).json({
        ok: true,
        message: 'Content added successfully',
        result: createdContent,
      });
    } catch (er: any) {
      console.error('POST /content error:', er);
      if (er instanceof multer.MulterError) {
        return res.status(400).json({
          ok: false,
          message: 'File upload error: ' + er.message,
        });
      }
      return res.status(500).json({
        ok: false,
        message: 'Internal Server Error',
      });
    }
  }
);


Contents_Router.delete("/delete", async (req, res) => {
  try {
   

    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({
        message: "Content ID is required..",
        ok: false,
      });
    }

    const deleted = await Contents.findByIdAndDelete(contentId);

    if (!deleted) {
      return res.status(404).json({
        message: "Content not found..",
        ok: false,
      });
    }

    return res.status(200).json({
      message: "Content Deleted Successfully..",
      ok: true,
    });
  } catch (er) {
    console.error("❌ Delete Error:", er);
    return res.status(500).json({
      message: "Internal Server Error..",
      error: er,
      ok: false,
    });
  }
});


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