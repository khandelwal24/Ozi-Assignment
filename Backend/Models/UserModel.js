import mongoose, { Mongoose } from "mongoose";

// *** USER-SCHEMA *** //
const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String, trim:true, required:true, unique:true},
    password:{type:String, required:true},
    tasks:[{type:mongoose.Schema.Types.ObjectId, ref:'Task'}]
},{timestamps:true});

export const userModel = mongoose.model('User',userSchema);


// -------------------------------------------------------------- //
// -------------------------------------------------------------- //
// -------------------------------------------------------------- //


// *** TASK-SCHEMA *** //
const taskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:{type:String, required:true, trim:true},
    description:{type:String, default:''},
    status:{type:String, enum:['Pending','Completed','In-progress'], default:'Pending'},
    dueDate:{type:Date},
},{timestamps:true});

export const taskModel = mongoose.model('Task',taskSchema);
