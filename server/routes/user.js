import express from 'express';
import {getAllUser, getUser, logout, signin, signup} from '../controller/user.js'
import { isLoggedIn } from '../middleware/userAuth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/logout', isLoggedIn, logout);
router.get('/:id/getuser', isLoggedIn, getUser);
router.get('/users', isLoggedIn, getAllUser);

export default router;