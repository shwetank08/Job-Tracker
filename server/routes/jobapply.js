import express from 'express';
import { isLoggedIn } from '../middleware/userAuth.js';
import { applyJob } from '../controller/jobapply.js';
import { upload } from '../middleware/multer.middelware.js';

const router = express.Router();

router.post('/apply/:id',isLoggedIn, upload.single('resume') ,applyJob);

export default router;
