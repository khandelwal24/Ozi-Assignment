import express from 'express'
import { Router } from 'express';
import { Register, Login, UpdateProfile, Logout, deleteUser, getUserProfile } from '../Controllers/UserController.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/logout').get(Logout);
router.route('/profile/update').post(isAuthenticated,UpdateProfile);
router.route('/profile/:id').get(isAuthenticated,getUserProfile);
router.route('/profile/delete').delete(isAuthenticated,deleteUser);

export default router;
