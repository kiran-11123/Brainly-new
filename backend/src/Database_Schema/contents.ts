import mongoose from "mongoose";


const Content_Schema = new mongoose.Schema({

    title:{type:String},
    link:{type:String},
    type:{type:String , enum:["youtube" , "twitter" , "pdf" , "image" , "text"]},
    tags:[{type:mongoose.Types.ObjectId , ref:'Tag'}],
    userId :{type:mongoose.Types.ObjectId , ref:'Users' ,required:true}

})


const Contents = mongoose.model("Contents" , Content_Schema);


export default Contents;