import express from 'express'
import { Router } from 'express'
import { AddTask, deleteTask, getUserTasks, updateTask } from '../Controllers/TaskController.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

router.route('/getTask').get(isAuthenticated,getUserTasks);
router.route('/addtask').post(isAuthenticated,AddTask);
router.route('/updateTask/:id').put(isAuthenticated,updateTask);
router.route('/deleteTask/:id').delete(isAuthenticated,deleteTask);

export default router;