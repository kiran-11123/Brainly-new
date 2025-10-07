import express from 'express';
import cors from 'cors';
import ConnectDB from './db';
import Auth_Router from './routes/Authentication_routes';
import Contents_Router from './routes/contents';
const app= express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

ConnectDB();

app.use("/api/v1/users" , Auth_Router);
app.use("/api/v1/data" , Contents_Router)











app.listen(3000,()=>{
    console.log("Server Connected...")
})
