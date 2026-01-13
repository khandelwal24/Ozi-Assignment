import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

import UserR from './Routes/UserRoute.js'
import TaskR from './Routes/TaskRoute.js'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:true,
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}));


// apis yahai aayenge
app.use('/api/v1/user',UserR);
app.use('/api/v1/task',TaskR);

mongoose.connect(process.env.MONGO_URI,{dbName:'Ozi'}).then(()=>console.log('MongoDB Connected Successfully')).catch(()=>console.log('Error While Connected Database'));

const port = process.env.PORT || 5500; 
app.listen(port,()=>console.log(`Server is Running on Port ${port}`));




