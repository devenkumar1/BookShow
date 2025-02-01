import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDb from './config/db.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cors from 'cors';

const PORT=process.env.PORT||4000;
dotenv.config();
const app=express();
app.use(cookieParser());
app.use(cors(
    { origin:"http://localhost:3000",credentials:true}
));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("welcome to bookshow backend");
})

app.use("/auth",userRoutes);
app.use("/auth/admin",adminRoutes);


app.listen(PORT,()=>{
    connectDb();
    console.log(`server started at http://localhost:3000`)
}) 