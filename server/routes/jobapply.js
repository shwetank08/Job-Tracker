import express from 'express';
import { isLoggedIn } from '../middleware/userAuth';
import { applyJob } from '../controller/jobapply';

const router = express.Router();

router.post('/apply',isLoggedIn, applyJob);

export default router;
