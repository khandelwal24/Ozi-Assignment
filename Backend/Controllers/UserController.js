import express from 'express'
import mongoose from 'mongoose'
import { userModel,taskModel } from '../Models/UserModel.js'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'


export const Register = async(req,res)=>{
    // console.log(req.body);
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password) return res.status(201).json({message:'All feilds are required',success:false});
        let userRespo = await userModel.findOne({email});
        if(userRespo) return res.status(401).json({message:'Email already exists',success:false});

        const hasPass = await bcrypt.hash(password,10);
        userRespo = await userModel.create({name,email,password:hasPass});
        res.status(200).json({message:'User Registered Successfully',success:true,userRespo});
    }
    catch(error){
        console.log('Error Occured in SignUp',error);
        res.status(401).json({message:'Error Occured in SignUp',success:false});
    }
};


export const Login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password) return res.status(201).json({message:'All feilds are required',success:false});
        
        let userRespo = await userModel.findOne({email});
        if(!userRespo) return res.status(201).json({message:'Invalid Email',success:false});

        const verifyPass = await bcrypt.compare(password,userRespo.password);
        if(!verifyPass) return res.status(401).json({message:'Invalid Password',success:false});

        const payload = {
            userId: userRespo._id,
            userEmail: userRespo.email,
            userName: userRespo.name
        };

        const token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});

        const options = {
            httpOnly:true,
            sameSite:'strict',
            maxAge: new Date(Date.now() + 1*24*60*60*1000),
        }

        userRespo = userRespo.toObject();
        userRespo.token = token;
        userRespo.password = undefined;

        res.cookie("RCookie",token,options).status(200).json({message:`User Logged in Successfully - Welcome back ${userRespo.name}`,success:true,userRespo});
    }
    catch(error){
        console.log('Error Occured in Login',error);
        return res.status(401).json({message:'Error Occured in login',success:false});
    }
};


export const Logout = async(req,res)=>{
    try{
        return res.cookie("RCookie",'',{maxAge:0}).status(200).json({message:'User Logged Out Successfully',success:true});
    }
    catch(error){
        console.log('Error Occured in logout',error);
        res.status(401).json({message:'Error occured in logout',success:false});
    }
};


export const UpdateProfile = async(req,res)=>{
    try{
        const Uid = req.id;
        const {name,currentPassword,newPassword,confirmPassword} = req.body;

        let userRespo = await userModel.findById(Uid).select('-password');
        if(!userRespo) return res.status(201).json({message:'User not found',success:false});

        if(newPassword !== confirmPassword) return res.status(201).json({message:'new Password and Confirm should be same',success:false});

        if(name) userRespo.name = name;
        if(newPassword){
            const hashPass = await bcrypt.hash(newPassword,10);
            userRespo.password = hashPass;
        }

        await userRespo?.save();
        return res.status(200).json({message:'Profile Updated Successfully',success:true});
    }
    catch(error){
        console.lof("Error Occured",error);
        return res.status(401).json({message:'Error Occured while profile Update',success:false});
    }
};


export const getUserProfile = async(req,res)=>{
    try{
        const Uid = req.params.id;
        const respo = await userModel.findById(Uid).populate({path:'tasks', createdAt:-1});
        if(!respo) return res.status(201).json({message:'User not authenticated',success:false});
        return res.status(200).json({message:'User profile Fetched Successfully', success:true, user:respo});
    }
    catch(error){
        console.log('Error occured',error);
        return res.status(201).json({message:'Error Occured in Geting profile',error});
    }
};


export const deleteUser = async(req,res)=>{
    try{
        const Uid = req.id;
        const user = await userModel.findById(Uid);
        if(!user) return res.status(401).json({message:'This user doesnt exist in the Database',success:false});
        
        await taskModel.deleteMany({user:Uid});
        await userModel.deleteOne();
        return res.status(200).json({message:'User removed Successfully',success:true});
    }
    catch(error){
        console.log('Error Occured',error);
        return res.status(401).json({message:'Error Occured in account deletion',error});
    }
};
