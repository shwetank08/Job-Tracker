import express from 'express';
import {deleteUser, getAllUser, getUser, logout, signin, signup, updateUser} from '../controller/user.js'
import { isLoggedIn } from '../middleware/userAuth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/logout', isLoggedIn, logout);
router.get('/:id/getuser', isLoggedIn, getUser);
router.get('/users', isLoggedIn, getAllUser);
router.delete('/deleteuser', isLoggedIn, deleteUser);
router.put('/update', isLoggedIn, updateUser);

export default router;