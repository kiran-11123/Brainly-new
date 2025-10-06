import mongoose from "mongoose";

const ConnectDB =async ()=>{
     

    try{
        await mongoose.connect("mongodb://localhost:27017/Brainly-new",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log("Database Connected")
    }

    catch(er){
         console.log(er);
         process.exit(1);
    }

}

export default ConnectDB;