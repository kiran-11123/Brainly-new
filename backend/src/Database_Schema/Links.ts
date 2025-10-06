import mongoose from "mongoose";


const Link_Schema = new mongoose.Schema({
      
    hash:{type:String},
    userId :{type:mongoose.Types.ObjectId , ref:"Users" , required:true  , unique:true}
})

const Links = mongoose.model("Links" , Link_Schema);


export default Links;