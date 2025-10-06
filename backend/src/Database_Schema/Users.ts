import mongoose from "mongoose";


const User_Schema  = new mongoose.Schema({
      email:{type:String , required:true , unique:true},
      username:{type:String , required:true , unique:true},
      password:{type:String , required:true}
})


const Users = mongoose.model("Users" , User_Schema );


export default Users;