import express from 'express';
import cors from 'cors';
import ConnectDB from './db';
import Auth_Router from './routes/Authentication_routes';
import Contents_Router from './routes/contents';
import cookieParser from "cookie-parser"
import Search_Router from './routes/Search_data';
import rateLimit from 'express-rate-limit';
const app= express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message:"Too Many requsts , Please try again later"
})
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


ConnectDB();

app.use("/api/v1/users" , Auth_Router);
app.use("/api/v1/data" , Contents_Router)
app.use("/api/v1/search" , Search_Router);











app.listen(3000,()=>{
    console.log("Server Connected...")
})
