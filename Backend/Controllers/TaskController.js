import mongoose from "mongoose";
import express from 'express'
import { userModel, taskModel } from "../Models/UserModel.js";


export const AddTask = async(req,res)=>{
    try{
        const {title,description,status,dueDate} = req.body;
        if(!title) return res.status(201).json({message:'Please add Tiltle first',success:false});
        
        let task = await taskModel.create({title,description,status,dueDate,user:req.id});
        await userModel.findByIdAndUpdate(req.id,{$push:{tasks:task._id}}); // explicitly adding it to my array.
        return res.status(200).json({message:'New task added Successfully',success:true, task});
    }
    catch(error){
        console.log('Error Occured',error);
        return res.status(201).json({message:'Error Occured in adding task',success:false});
    }
};


export const getUserTasks = async(req,res)=>{
    try{
        const Uid = req.id;
        // console.log("Type of Uid:", typeof Uid); // Should be 'string'
        // console.log("Value of Uid:", Uid);
        const tasks = await taskModel.find({user:Uid}).populate({path:'user',createdAt:-1}).sort({createdAt:-1});
        return res.status(200).json({message:'Tasks fetched successfully',success:true,tasks});
    }
    catch(error){
        console.log('Error Occured in fetching task',error);
        return res.status(201).json({message:'Error Occured in fetching tasks',success:false});
    }
};


export const updateTask = async(req,res)=>{
    try{
        const taskId = req.params.id;
        const Uid = req.id;
        const task = await taskModel.findById(taskId);
        if(!task) return res.status(201).json({message:'This task does not exist',success:false});

        if(task.user.toString() !== Uid.toString()) return res.status(201).json({message:'User not Authenticated to update this task',success:false});
        const UpdateT = await taskModel.findByIdAndUpdate(taskId, req.body, {new:true}).populate({path:'user'});
        return res.status(200).json({message:'Updated Task Successfully',success:true, UpdateT});
    }
    catch(error){
        console.log('Error Occured in update task',error);
        return res.status(201).json({message:'Error Occured in updating tasks',success:false});
    }
}


export const deleteTask = async(req,res)=>{
    try{
        const taskId = req.params.id;
        const Uid = req.id;
        const task = await taskModel.findById(taskId);
        
        if(!task) return res.status(201).json({message:'This task maybe already deleted',success:false});

        if(task.user.toString() !== Uid.toString()) return res.status(201).json({message:'User not Authenticated',success:false});

        await task.deleteOne();
        return res.status(200).json({message:'Deleted Successfully', success:true});
    }
    catch(error){
        console.log('Error Occured in deleting task',error);
        return res.status(201).json({message:'Error Occured in deleting tasks',success:false});
    }
}