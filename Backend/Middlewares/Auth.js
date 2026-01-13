import express from 'express'
import mongoose from 'mongoose'
import { userModel, taskModel } from '../Models/UserModel.js'
import path from 'path'
import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req,res,next)=>{
    try{
        const token = await req?.cookies?.RCookie || req?.body?.token;
        if(!token) return res.status(401).json({message:'Token Not Found', success:false});

        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            if(!decode) return res.status(401).json({message:'Invalid Token', success:false});
            req.id = decode.userId;
        }
        catch(error){
            console.log('Error Occured',error);
            res.status(401).json({message:"Error Occured",success:false});
        }
        next();
    }
    catch(error){
        res.status(401).json({message:"Error Occured",success:false});
        console.log('Error Occured',error);
    }
};